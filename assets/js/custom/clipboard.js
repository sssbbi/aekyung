// 복사버튼
function copyToClipboard(className) {
  var copyElement = document.getElementsByClassName(className),
      tempElement = document.createElement('textarea');
  
  tempElement.value = copyElement[0].tagName === "STYLE" ? copyElement[0].innerHTML : copyElement[0].outerHTML;
  document.body.appendChild(tempElement);
  
  tempElement.select();
  document.execCommand("copy");
  document.body.removeChild(tempElement);
}