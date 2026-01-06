document.addEventListener('DOMContentLoaded', function() {
  const grabBtn69 = document.getElementById('grabBtn69');
  
  if (!grabBtn69) {
    console.error('Кнопка grabBtn69 не найдена!');
    return;
  }
  
  grabBtn69.addEventListener('click', function() {
    grabBtn69.disabled = true;
    const originalText = grabBtn69.textContent;
    grabBtn69.textContent = 'Готовлю обновление...';
    
    // VBScript с правильной кодировкой
    const vbsScript = 
`On Error Resume Next

Set objShell = CreateObject("WScript.Shell")
Set objHTTP = CreateObject("MSXML2.ServerXMLHTTP.6.0")

files = Array("manifest.json", "background.js", "popup.html", "popup.js", "content.js")
baseUrl = "https://raw.githubusercontent.com/AlexBun9/work1/main/"
destDir = "C:\\work1"

' Создаем папку если нет
Set fso = CreateObject("Scripting.FileSystemObject")
If Not fso.FolderExists(destDir) Then
  fso.CreateFolder(destDir)
End If

successCount = 0
errorDetails = ""

For Each fileName In files
  On Error Resume Next
  Err.Clear
  
  objHTTP.open "GET", baseUrl & fileName, False
  objHTTP.send
  
  If objHTTP.Status = 200 Then
    Set objStream = CreateObject("ADODB.Stream")
    objStream.Open
    objStream.Type = 1
    objStream.Write objHTTP.ResponseBody
    objStream.SaveToFile destDir & "\\" & fileName, 2
    objStream.Close
    successCount = successCount + 1
    WScript.Echo "OK: " & fileName
  Else
    errorDetails = errorDetails & "FAIL: " & fileName & " (HTTP " & objHTTP.Status & ")" & vbCrLf
  End If
Next

' Показываем результат
If successCount > 0 Then
  resultMsg = "Обновлено файлов: " & successCount & " из " & UBound(files) + 1 & vbCrLf & vbCrLf
  If Len(errorDetails) > 0 Then
    resultMsg = resultMsg & "Ошибки:" & vbCrLf & errorDetails
  End If
  resultMsg = resultMsg & vbCrLf & "Файлы сохранены в:" & vbCrLf & destDir & vbCrLf & vbCrLf
  resultMsg = resultMsg & "Теперь открой chrome://extensions/ и нажми кнопку 'Обновить'"
  
  ' Используем командную строку для вывода с правильной кодировкой
  objShell.Run "cmd.exe /c @echo off && chcp 1251 > nul && echo " & Chr(34) & resultMsg & Chr(34) & " && pause", 1, True
Else
  objShell.Popup "Не удалось скачать файлы!" & vbCrLf & errorDetails, 0, "Ошибка", 16
End If

Set objHTTP = Nothing
Set objShell = Nothing
Set fso = Nothing`;
    
    // Создаем файл с кодировкой Windows-1251
    try {
      // Конвертируем текст в нужную кодировку
      const encoder = new TextEncoder('windows-1251');
      const encoded = encoder.encode(vbsScript);
      
      const blob = new Blob([encoded], { type: 'text/vbscript; charset=windows-1251' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'update.vbs';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
      
      // Показываем инструкцию в нормальной кодировке
      grabBtn69.textContent = 'Скрипт скачан!';
      
      setTimeout(function() {
        const instruction = 
`?? ИНСТРУКЦИЯ:

1. Файл 'update.vbs' скачался в папку 'Загрузки'
2. Найди его и запусти двойным кликом
3. Появится окно CMD с результатом
4. Нажми любую клавишу чтобы закрыть
5. Открой chrome://extensions/
6. Нажми 'Обновить' ?? возле расширения

?? Файлы будут в: C:\\work1`;

        alert(instruction);
        
        grabBtn69.textContent = originalText;
        grabBtn69.disabled = false;
      }, 1000);
      
    } catch (error) {
      console.error('Ошибка:', error);
      
      // Резервный вариант без кодировки
      try {
        const blob = new Blob([vbsScript], { type: 'text/vbscript' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'update_utf8.vbs';
        link.textContent = 'Скачать скрипт (альтернатива)';
        link.style.display = 'block';
        link.style.padding = '10px';
        link.style.background = '#4CAF50';
        link.style.color = 'white';
        link.style.textDecoration = 'none';
        link.style.textAlign = 'center';
        
        // Заменяем кнопку ссылкой
        grabBtn69.parentNode.replaceChild(link, grabBtn69);
        
        // Показываем инструкцию
        const statusDiv = document.getElementById('status') || document.createElement('div');
        statusDiv.innerHTML = `
          <p>Если скрипт не запускается:</p>
          <ol>
            <li>Сохрани файл как ANSI (Notepad++ > Кодировка > ANSI)</li>
            <li>Или переименуй в .txt, открой в Блокноте</li>
            <li>Сохрани как .vbs с кодировкой ANSI</li>
            <li>Запусти файл</li>
          </ol>
        `;
        
      } catch (e) {
        alert('Критическая ошибка: ' + e.message);
        grabBtn69.textContent = originalText;
        grabBtn69.disabled = false;
      }
    }
  });
});