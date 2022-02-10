//JavaScript根据文件名判断文件类型

const imgExt = [".png", ".jpg", ".jpeg", ".bmp", ".gif"]; //图片文件的后缀名
const docExt = [".doc", ".docx"]; //word文件的后缀名
const xlsExt = [".xls", ".xlsx"]; //excel文件的后缀名
const pdfExt = [".pdf"]; //pdf文件的后缀名
const videoExt = [".webm", ".mp4", ".ogg"]; //视频文件后缀
const audioExt = [".mp3", ".wav"]; //音频文件后缀

function check(url, extArr) {
  if (!url) {
    return false;
  } else {
    return extArr.includes(url.substr(url.lastIndexOf(".")));
  }
}
export function isImg(url) {
  return check(url, imgExt);
}

export function isDoc(url) {
  return check(url, docExt);
}

export function isXls(url) {
  return check(url, xlsExt);
}
export function isPdf(url) {
  return check(url, pdfExt);
}
export function isVideo(url) {
  return check(url, videoExt);
}
export function isAudio(url) {
  return check(url, audioExt);
}
