// popup.js - РАБОЧИЙ ВАРИАНТ БЕЗ ADODB.Stream
document.getElementById('grabBtn69').addEventListener('click', function() {
  const btn = this;
  
  // VBScript БЕЗ ADODB.Stream - работает на любом Windows
  const vbsScript = 
`' VBScript скачивание файлов БЕЗ ADODB.Stream
Option Explicit

Dim fso, http, folder, files, i, url, path, content
Dim objShell, tempFile, psScript

Set fso = CreateObject("Scripting.FileSystemObject")
Set http = CreateObject("Microsoft.XMLHTTP")
Set objShell = CreateObject("WScript.Shell")

folder = "C:\\work1"
If Not fso.FolderExists(folder) Then fso.CreateFolder folder

' Список файлов
files = Array("manifest.json", "background.js", "popup.html", "popup.js", "content.js")

' Метод 1: Пробуем через CreateTextFile с Unicode
For i = 0 To UBound(files)
    url = "https://raw.githubusercontent.com/AlexBun9/work1/main/" & files(i)
    path = folder & "\\" & files(i)
    
    http.Open "GET", url, False
    http.Send
    
    If http.Status = 200 Then
        content = http.responseText
        
        ' Сохраняем как Unicode (UTF-16 LE) - это работает!
        Dim txtFile
        Set txtFile = fso.CreateTextFile(path, True, True) ' True = Unicode
        txtFile.Write content
        txtFile.Close
        
        ' Для HTML файлов добавляем meta charset
        If LCase(Right(files(i), 5)) = ".html" Then
            FixHtmlEncoding path
        End If
        
        WScript.Echo "OK: " & files(i)
    Else
        WScript.Echo "ERROR: " & files(i) & " - HTTP " & http.Status
    End If
Next

' Функция для исправления кодировки в HTML
Sub FixHtmlEncoding(filePath)
    Dim fileContent, newContent
    If fso.FileExists(filePath) Then
        Set txtFile = fso.OpenTextFile(filePath, 1, False, -1) ' -1 = Unicode
        fileContent = txtFile.ReadAll
        txtFile.Close
        
        ' Добавляем meta charset если нет
        If InStr(fileContent, "charset=") = 0 Then
            newContent = Replace(fileContent, "<head>", "<head>" & vbCrLf & "    <meta charset=""UTF-8"">")
            
            Set txtFile = fso.CreateTextFile(filePath, True, True)
            txtFile.Write newContent
            txtFile.Close
        End If
    End If
End Sub

MsgBox "Файлы сохранены! Проверьте папку:" & vbCrLf & folder

Set fso = Nothing
Set http = Nothing
Set objShell = Nothing`;
  
  // Скачиваем VBScript
  const blob = new Blob([vbsScript], { type: 'text/vbscript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'download_unicode.vbs';
  a.click();
  
  setTimeout(() => {
    alert('✅ VBScript создан!\n\nЗапустите его. Файлы сохранятся в Unicode (UTF-16).\n\nПосле этого:\n1. Откройте popup.html в Блокноте\n2. Файл → Сохранить как...\n3. Кодировка: UTF-8\n4. Сохраните\n5. Обновите расширение');
    URL.revokeObjectURL(url);
  }, 500);
});