// popup.js - УПРОЩЕННЫЙ рабочий VBScript
document.getElementById('grabBtn69').addEventListener('click', function() {
  const btn = this;
  btn.disabled = true;
  
  // ПРОСТОЙ И РАБОЧИЙ VBScript
  const vbsScript = 
`Set http = CreateObject("MSXML2.XMLHTTP")
Set stream = CreateObject("ADODB.Stream")
Set fso = CreateObject("Scripting.FileSystemObject")
Set shell = CreateObject("WScript.Shell")

folder = "C:\\work1"
If Not fso.FolderExists(folder) Then fso.CreateFolder folder

files = Array("manifest.json", "background.js", "popup.html", "popup.js", "content.js")
baseUrl = "https://raw.githubusercontent.com/AlexBun9/work1/main/"

For Each f In files
    url = baseUrl & f
    path = folder & "\\" & f
    
    http.Open "GET", url, False
    http.Send
    
    If http.Status = 200 Then
        stream.Open
        stream.Type = 1
        stream.Write http.ResponseBody
        stream.SaveToFile path, 2
        stream.Close
        
        size = fso.GetFile(path).Size
        WScript.Echo f & " - " & size & " bytes"
    Else
        WScript.Echo "Error: " & f
    End If
Next

shell.Popup "Download complete! Check C:\\work1", 5, "Info", 64`;

  // Скачиваем VBScript
  const blob = new Blob([vbsScript], { type: 'text/vbscript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'get_files.vbs';
  a.click();
  
  setTimeout(() => {
    alert('VBScript created. Run it and check C:\\work1 folder.');
    btn.disabled = false;
    URL.revokeObjectURL(url);
  }, 500);
});