// popup.js - САМЫЙ ПРОСТОЙ рабочий вариант
document.getElementById('grabBtn69').addEventListener('click', function() {
  const btn = this;
  
  // Создаем ПРОСТОЙ VBScript который точно работает
  const simpleScript = 
`Set fso = CreateObject("Scripting.FileSystemObject")
Set http = CreateObject("Microsoft.XMLHTTP")

folder = "C:\\work1"
If Not fso.FolderExists(folder) Then fso.CreateFolder folder

files = "manifest.json,background.js,popup.html,popup.js,content.js"
fileArray = Split(files, ",")

For Each f In fileArray
    http.Open "GET", "https://raw.githubusercontent.com/AlexBun9/work1/main/" & f, False
    http.Send
    
    If http.Status = 200 Then
        Set file = fso.CreateTextFile(folder & "\\" & f, True)
        file.Write http.responseText
        file.Close
        Set file = Nothing
    End If
Next

MsgBox "Done! Check " & folder`;
  
  // Скачиваем
  const blob = new Blob([simpleScript], { type: 'text/vbscript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'simple_download.vbs';
  a.click();
  
  setTimeout(() => {
    alert('Файл simple_download.vbs создан\nЗапусти его\nФайлы появятся в C:\\work1');
    URL.revokeObjectURL(url);
  }, 500);
});