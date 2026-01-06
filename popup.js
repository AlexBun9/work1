// popup.js - ВАРИАНТ С ПРАВИЛЬНОЙ КОДИРОВКОЙ UTF-8
document.getElementById('grabBtn69').addEventListener('click', function() {
  const btn = this;
  
  // VBScript с сохранением в UTF-8
  const vbsScript = 
`Set fso = CreateObject("Scripting.FileSystemObject")
Set http = CreateObject("Microsoft.XMLHTTP")
Set stream = CreateObject("ADODB.Stream")

folder = "C:\\work1"
If Not fso.FolderExists(folder) Then fso.CreateFolder folder

files = Array("manifest.json", "background.js", "popup.html", "popup.js", "content.js")

For Each f In files
    url = "https://raw.githubusercontent.com/AlexBun9/work1/main/" & f
    path = folder & "\\" & f
    
    http.Open "GET", url, False
    http.Send
    
    If http.Status = 200 Then
        ' ОЧЕНЬ ВАЖНО: Сохраняем как UTF-8
        stream.Open
        stream.Type = 1 ' Binary
        stream.Write http.ResponseBody
        stream.Position = 0
        stream.Type = 2 ' Text
        stream.Charset = "utf-8"
        content = stream.ReadText
        stream.Close
        
        ' Перезаписываем файл в UTF-8
        stream.Open
        stream.Type = 2
        stream.Charset = "utf-8"
        stream.WriteText content
        stream.SaveToFile path, 2
        stream.Close
    End If
Next

MsgBox "Файлы сохранены в UTF-8 кодировке в папке:" & vbCrLf & folder`;
  
  // Скачиваем VBScript
  const blob = new Blob([vbsScript], { type: 'text/vbscript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'update_utf8.vbs';
  a.click();
  
  setTimeout(() => {
    alert('Файл update_utf8.vbs создан\nЗапусти его\nФайлы сохранятся в UTF-8 кодировке');
    URL.revokeObjectURL(url);
  }, 500);
});