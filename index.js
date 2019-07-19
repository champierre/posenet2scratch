const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const Ml5 = require('./ml5.min.js');
const formatMessage = require('format-message');
const Message = {
  x: {
    'ja': 'のx座標',
    'ja-Hira': 'のxざひょう',
    'en': ' x'
  },
  y: {
    'ja': 'のy座標',
    'ja-Hira': 'のyざひょう',
    'en': ' y'
  },
  nose: {
    'ja': '鼻',
    'ja-Hira': 'はな',
    'en': 'nose'
  },
  leftEye: {
    'ja': '左目',
    'ja-Hira': 'ひだりめ',
    'en': 'left eye'
  },
  rightEye: {
    'ja': '右目',
    'ja-Hira': 'みぎめ',
    'en': 'right eye'
  },
  leftEar: {
    'ja': '左耳',
    'ja-Hira': 'ひだりみみ',
    'en': 'left ear'
  },
  rightEar: {
    'ja': '右耳',
    'ja-Hira': 'みぎみみ',
    'en': 'right ear'
  },
  leftShoulder: {
    'ja': '左肩',
    'ja-Hira': 'ひだりかた',
    'en': 'left shoulder'
  },
  rightShoulder: {
    'ja': '右肩',
    'ja-Hira': 'みぎかた',
    'en': 'right shoulder'
  },
  leftElbow: {
    'ja': '左ひじ',
    'ja-Hira': 'ひだりひじ',
    'en': 'left elbow'
  },
  rightElbow: {
    'ja': '右ひじ',
    'ja-Hira': 'みぎひじ',
    'en': 'right elbow'
  },
  leftWrist: {
    'ja': '左手首',
    'ja-Hira': 'ひだりてくび',
    'en': 'left wrist'
  },
  rightWrist: {
    'ja': '右手首',
    'ja-Hira': 'みぎてくび',
    'en': 'right wrist'
  },
  leftHip: {
    'ja': '左腰',
    'ja-Hira': 'ひだりこし',
    'en': 'left hip'
  },
  rightHip: {
    'ja': '右腰',
    'ja-Hira': 'みぎこし',
    'en': 'right hip'
  },
  leftKnee: {
    'ja': '左ひざ',
    'ja-Hira': 'ひだりひざ',
    'en': 'left knee'
  },
  rightKnee: {
    'ja': '右ひざ',
    'ja-Hira': 'みぎひざ',
    'en': 'right knee'
  },
  leftAnkle: {
    'ja': '左足首',
    'ja-Hira': 'ひだりあしくび',
    'en': 'left ankle'
  },
  rightAnkle: {
    'ja': '右足首',
    'ja-Hira': 'みぎあしくび',
    'en': 'right ankle'
  },
  getX: {
    'ja': '[PERSON_NUMBER] 人目の [PART] のx座標',
    'ja-Hira': '[PERSON_NUMBER] にんめの [PART] のxざひょう',
    'en': '[PART] x of person no. [PERSON_NUMBER]'
  },
  getY: {
    'ja': '[PERSON_NUMBER] 人目の [PART] のy座標',
    'ja-Hira': '[PERSON_NUMBER] にんめの [PART] のyざひょう',
    'en': '[PART] y of person no. [PERSON_NUMBER]'
  }
}
const AvailableLocales = ['en', 'ja', 'ja-Hira'];

class Scratch3Posenet2ScratchBlocks {
    get PERSON_NUMBERS_MENU () {
      return [
          {
              text: '1',
              value: '0'
          },
          {
              text: '2',
              value: '1'
          },
          {
              text: '3',
              value: '2'
          },
          {
              text: '4',
              value: '3'
          },
          {
              text: '5',
              value: '4'
          },
          {
              text: '6',
              value: '5'
          },
          {
              text: '7',
              value: '6'
          },
          {
              text: '8',
              value: '7'
          },
          {
              text: '9',
              value: '8'
          },
          {
              text: '10',
              value: '9'
          }
      ]
    }

    get PARTS_MENU () {
      return [
         {
             text: Message.nose[this._locale],
             value: '0'
         },
         {
             text: Message.leftEye[this._locale],
             value: '1'
         },
         {
             text: Message.rightEye[this._locale],
             value: '2'
         },
         {
             text: Message.leftEar[this._locale],
             value: '3'
         },
         {
             text: Message.rightEar[this._locale],
             value: '4'
         },
         {
             text: Message.leftShoulder[this._locale],
             value: '5'
         },
         {
             text: Message.rightShoulder[this._locale],
             value: '6'
         },
         {
             text: Message.leftElbow[this._locale],
             value: '7'
         },
         {
             text: Message.rightElbow[this._locale],
             value: '8'
         },
         {
             text: Message.leftWrist[this._locale],
             value: '9'
         },
         {
             text: Message.rightWrist[this._locale],
             value: '10'
         },
         {
             text: Message.leftHip[this._locale],
             value: '11'
         },
         {
             text: Message.rightHip[this._locale],
             value: '12'
         },
         {
             text: Message.leftKnee[this._locale],
             value: '13'
         },
         {
             text: Message.rightKnee[this._locale],
             value: '14'
         },
         {
             text: Message.leftAnkle[this._locale],
             value: '15'
         },
         {
             text: Message.rightAnkle[this._locale],
             value: '16'
         }
      ]
    }

    constructor (runtime) {
        this.runtime = runtime;

        this.poses = [];
        this.keypoints = [];

        let video = document.createElement("video");
        video.width = 480;
        video.height = 360;
        video.autoplay = true;
        video.style.display = "none";

        let media = navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });

        media.then((stream) => {
            video.srcObject = stream;
        });

        let poseNet = Ml5.poseNet(video, ()=>{
            console.log('Model Loaded!');
        });

        poseNet.on('pose', (poses)=>{
            if (poses.length > 0) {
                this.poses = poses;
                this.keypoints = poses[0].pose.keypoints;
            }
        });
    }

    getInfo () {
        this._locale = this.setLocale();
        return {
            id: 'posenet2scratch',
            name: 'Posenet2Scratch',
            blocks: [
                {
                    opcode: 'getNoseX',
                    blockType: BlockType.REPORTER,
                    text: Message.nose[this._locale] + Message.x[this._locale]
                },
                {
                    opcode: 'getNoseY',
                    blockType: BlockType.REPORTER,
                    text: Message.nose[this._locale] + Message.y[this._locale]
                },
                {
                    opcode: 'getLeftEyeX',
                    blockType: BlockType.REPORTER,
                    text: Message.leftEye[this._locale] + Message.x[this._locale]
                },
                {
                    opcode: 'getLeftEyeY',
                    blockType: BlockType.REPORTER,
                    text: Message.leftEye[this._locale] + Message.y[this._locale]
                },
                {
                    opcode: 'getRightEyeX',
                    blockType: BlockType.REPORTER,
                    text: Message.rightEye[this._locale] + Message.x[this._locale]
                },
                {
                    opcode: 'getRightEyeY',
                    blockType: BlockType.REPORTER,
                    text: Message.rightEye[this._locale] + Message.y[this._locale]
                },
                {
                    opcode: 'getLeftEarX',
                    blockType: BlockType.REPORTER,
                    text: Message.leftEar[this._locale] + Message.x[this._locale]
                },
                {
                    opcode: 'getLeftEarY',
                    blockType: BlockType.REPORTER,
                    text: Message.leftEar[this._locale] + Message.y[this._locale]
                },
                {
                    opcode: 'getRightEarX',
                    blockType: BlockType.REPORTER,
                    text: Message.rightEar[this._locale] + Message.x[this._locale]
                },
                {
                    opcode: 'getRightEarY',
                    blockType: BlockType.REPORTER,
                    text: Message.rightEar[this._locale] + Message.y[this._locale]
                },
                {
                    opcode: 'getLeftShoulderX',
                    blockType: BlockType.REPORTER,
                    text: Message.leftShoulder[this._locale] + Message.x[this._locale]
                },
                {
                    opcode: 'getLeftShoulderY',
                    blockType: BlockType.REPORTER,
                    text: Message.leftShoulder[this._locale] + Message.y[this._locale]
                },
                {
                    opcode: 'getRightShoulderX',
                    blockType: BlockType.REPORTER,
                    text: Message.rightShoulder[this._locale] + Message.x[this._locale]
                },
                {
                    opcode: 'getRightShoulderY',
                    blockType: BlockType.REPORTER,
                    text: Message.rightShoulder[this._locale] + Message.y[this._locale]
                },
                {
                    opcode: 'getLeftElbowX',
                    blockType: BlockType.REPORTER,
                    text: Message.leftElbow[this._locale] + Message.x[this._locale]
                },
                {
                    opcode: 'getLeftElbowY',
                    blockType: BlockType.REPORTER,
                    text: Message.leftElbow[this._locale] + Message.y[this._locale]
                },
                {
                    opcode: 'getRightElbowX',
                    blockType: BlockType.REPORTER,
                    text: Message.rightElbow[this._locale] + Message.x[this._locale]
                },
                {
                    opcode: 'getRightElbowY',
                    blockType: BlockType.REPORTER,
                    text: Message.rightElbow[this._locale] + Message.y[this._locale]
                },
                {
                    opcode: 'getLeftWristX',
                    blockType: BlockType.REPORTER,
                    text: Message.leftWrist[this._locale] + Message.x[this._locale]
                },
                {
                    opcode: 'getLeftWristY',
                    blockType: BlockType.REPORTER,
                    text: Message.leftWrist[this._locale] + Message.y[this._locale]
                },
                {
                    opcode: 'getRightWristX',
                    blockType: BlockType.REPORTER,
                    text: Message.rightWrist[this._locale] + Message.x[this._locale]
                },
                {
                    opcode: 'getRightWristY',
                    blockType: BlockType.REPORTER,
                    text: Message.rightWrist[this._locale] + Message.y[this._locale]
                },
                {
                    opcode: 'getLeftHipX',
                    blockType: BlockType.REPORTER,
                    text: Message.leftHip[this._locale] + Message.x[this._locale]
                },
                {
                    opcode: 'getLeftHipY',
                    blockType: BlockType.REPORTER,
                    text: Message.leftHip[this._locale] + Message.y[this._locale]
                },
                {
                    opcode: 'getRightHipX',
                    blockType: BlockType.REPORTER,
                    text: Message.rightHip[this._locale] + Message.x[this._locale]
                },
                {
                    opcode: 'getRightHipY',
                    blockType: BlockType.REPORTER,
                    text: Message.rightHip[this._locale] + Message.y[this._locale]
                },
                {
                    opcode: 'getLeftKneeX',
                    blockType: BlockType.REPORTER,
                    text: Message.leftKnee[this._locale] + Message.x[this._locale]
                },
                {
                    opcode: 'getLeftKneeY',
                    blockType: BlockType.REPORTER,
                    text: Message.leftKnee[this._locale] + Message.y[this._locale]
                },
                {
                    opcode: 'getRightKneeX',
                    blockType: BlockType.REPORTER,
                    text: Message.rightKnee[this._locale] + Message.x[this._locale]
                },
                {
                    opcode: 'getRightKneeY',
                    blockType: BlockType.REPORTER,
                    text: Message.rightKnee[this._locale] + Message.y[this._locale]
                },
                {
                    opcode: 'getLeftAnkleX',
                    blockType: BlockType.REPORTER,
                    text: Message.leftAnkle[this._locale] + Message.x[this._locale]
                },
                {
                    opcode: 'getLeftAnkleY',
                    blockType: BlockType.REPORTER,
                    text: Message.leftAnkle[this._locale] + Message.y[this._locale]
                },
                {
                    opcode: 'getRightAnkleX',
                    blockType: BlockType.REPORTER,
                    text: Message.rightAnkle[this._locale] + Message.x[this._locale]
                },
                {
                    opcode: 'getRightAnkleY',
                    blockType: BlockType.REPORTER,
                    text: Message.rightAnkle[this._locale] + Message.y[this._locale]
                },
                {
                    opcode: 'getX',
                    blockType: BlockType.REPORTER,
                    text: Message.getX[this._locale],
                    arguments: {
                        PERSON_NUMBER: {
                            type: ArgumentType.STRING,
                            menu: 'personNumbers',
                            defaultValue: '0'
                        },
                        PART: {
                            type: ArgumentType.STRING,
                            menu: 'parts',
                            defaultValue: '0'
                        }
                    }
                },
                {
                    opcode: 'getY',
                    blockType: BlockType.REPORTER,
                    text: Message.getY[this._locale],
                    arguments: {
                        PERSON_NUMBER: {
                            type: ArgumentType.STRING,
                            menu: 'personNumbers',
                            defaultValue: '0'
                        },
                        PART: {
                            type: ArgumentType.STRING,
                            menu: 'parts',
                            defaultValue: '0'
                        }
                    }
                }
            ],
            menus: {
              personNumbers: this.PERSON_NUMBERS_MENU,
              parts: this.PARTS_MENU
            }
        };
    }

    getX (args) {
      if (this.poses[parseInt(args.PERSON_NUMBER, 10)]) {
        return 240 - this.poses[parseInt(args.PERSON_NUMBER, 10)].pose.keypoints[parseInt(args.PART, 10)].position.x;
      }
    }

    getY (args) {
      if (this.poses[parseInt(args.PERSON_NUMBER, 10)]) {
        return 180 - this.poses[parseInt(args.PERSON_NUMBER, 10)].pose.keypoints[parseInt(args.PART, 10)].position.y;
      }
    }

    getNoseX (args) {
      return 240 - this.keypoints[0].position.x;
    }

    getNoseY (args) {
      return 180 - this.keypoints[0].position.y;
    }

    getLeftEyeX () {
      return 240 - this.keypoints[1].position.x;
    }

    getLeftEyeY () {
      return 180 - this.keypoints[1].position.y;
    }

    getRightEyeX () {
      return 240 - this.keypoints[2].position.x;
    }

    getRightEyeY () {
      return 180 - this.keypoints[2].position.y;
    }

    getLeftEarX () {
      return 240 - this.keypoints[3].position.x;
    }

    getLeftEarY () {
      return 180 - this.keypoints[3].position.y;
    }

    getRightEarX () {
      return 240 - this.keypoints[4].position.x;
    }

    getRightEarY () {
      return 180 - this.keypoints[4].position.y;
    }

    getLeftShoulderX () {
      return 240 - this.keypoints[5].position.x;
    }

    getLeftShoulderY () {
      return 180 - this.keypoints[5].position.y;
    }

    getRightShoulderX () {
      return 240 - this.keypoints[6].position.x;
    }

    getRightShoulderY () {
      return 180 - this.keypoints[6].position.y;
    }

    getLeftElbowX () {
      return 240 - this.keypoints[7].position.x;
    }

    getLeftElbowY () {
      return 180 - this.keypoints[7].position.y;
    }

    getRightElbowX () {
      return 240 - this.keypoints[8].position.x;
    }

    getRightElbowY () {
      return 180 - this.keypoints[8].position.y;
    }

    getLeftWristX () {
      return 240 - this.keypoints[9].position.x;
    }

    getLeftWristY () {
      return 180 - this.keypoints[9].position.y;
    }

    getRightWristX () {
      return 240 - this.keypoints[10].position.x;
    }

    getRightWristY () {
      return 180 - this.keypoints[10].position.y;
    }

    getLeftHipX () {
      return 240 - this.keypoints[11].position.x;
    }

    getLeftHipY () {
      return 180 - this.keypoints[11].position.y;
    }

    getRightHipX () {
      return 240 - this.keypoints[12].position.x;
    }

    getRightHipY () {
      return 180 - this.keypoints[12].position.y;
    }

    getLeftKneeX () {
      return 240 - this.keypoints[13].position.x;
    }

    getLeftKneeY () {
      return 180 - this.keypoints[13].position.y;
    }

    getRightKneeX () {
      return 240 - this.keypoints[14].position.x;
    }

    getRightKneeY () {
      return 180 - this.keypoints[14].position.y;
    }

    getLeftAnkleX () {
      return 240 - this.keypoints[15].position.x;
    }

    getLeftAnkleY () {
      return 180 - this.keypoints[15].position.y;
    }

    getRightAnkleX () {
      return 240 - this.keypoints[16].position.x;
    }

    getRightAnkleY () {
      return 180 - this.keypoints[16].position.y;
    }

    setLocale() {
      let locale = formatMessage.setup().locale;
      if (AvailableLocales.includes(locale)) {
        return locale;
      } else {
        return 'en';
      }
    }
}

module.exports = Scratch3Posenet2ScratchBlocks;
