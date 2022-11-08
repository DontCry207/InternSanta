var canvas = document.createElement('canvas');
            //캔버스 크기 설정
            canvas.width = 600; //가로 100px
            canvas.height = 400; //세로 100px
var context = canvas.getContext("2d");
context.globalCompositeOperation = "source-over";

var $file = document.querySelector('#getfile');
var $file2 = document.querySelector('#getfile2');

function changeImg (fileImg) { 
    var fileList = fileImg.files;

    // 읽기
    var reader = new FileReader();
    reader.readAsDataURL(fileList [0]);

    //로드 한 후
    reader.onload = function  () {
        //썸네일 이미지 생성
        var tempImage = new Image(); //drawImage 메서드에 넣기 위해 이미지 객체화
        tempImage.src = reader.result; //data-uri를 이미지 객체에 주입
        tempImage.onload = function () {
            //이미지를 캔버스에 그리기
            context.drawImage(this, 0, 0, 600, 400);

            //캔버스에 그린 이미지를 다시 data-uri 형태로 변환
            var dataURI = canvas.toDataURL("image/jpeg");

            //썸네일 이미지 보여주기
            document.querySelector('#preview').src = dataURI;
        };
    };
};