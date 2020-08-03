const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const ml5 = require('ml5');
const formatMessage = require('format-message');
const blockIconURI = 'data:image/png;base64,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';

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
  peopleCount: {
    'ja': '人数',
    'ja-Hira': 'にんずう',
    'en': 'people count'
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
  },
  videoToggle: {
    'ja': 'ビデオを[VIDEO_STATE]にする',
    'ja-Hira': 'ビデオを[VIDEO_STATE]にする',
    'en': 'turn video [VIDEO_STATE]'
  },
  on: {
    'ja': '入',
    'ja-Hira': 'いり',
    'en': 'on'
  },
  off: {
    'ja': '切',
    'ja-Hira': 'きり',
    'en': 'off'
  },
  video_on_flipped: {
    'ja': '左右反転',
    'ja-Hira': 'さゆうはんてん',
    'en': 'on flipped',
  },
}
const AvailableLocales = ['en', 'ja', 'ja-Hira'];

class Scratch3Posenet2ScratchBlocks {
    get PERSON_NUMBERS_MENU () {
      return [
          {
              text: '1',
              value: '1'
          },
          {
              text: '2',
              value: '2'
          },
          {
              text: '3',
              value: '3'
          },
          {
              text: '4',
              value: '4'
          },
          {
              text: '5',
              value: '5'
          },
          {
              text: '6',
              value: '6'
          },
          {
              text: '7',
              value: '7'
          },
          {
              text: '8',
              value: '8'
          },
          {
              text: '9',
              value: '9'
          },
          {
              text: '10',
              value: '10'
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

    get VIDEO_MENU () {
      return [
          {
            text: Message.off[this._locale],
            value: 'off'
          },
          {
            text: Message.on[this._locale],
            value: 'on'
          },
          {
            text: Message.video_on_flipped[this._locale],
            value: 'on-flipped'
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

        let poseNet = ml5.poseNet(video, ()=>{
            console.log('Model Loaded!');
        });

        poseNet.on('pose', (poses)=>{
            if (poses.length > 0) {
                this.poses = poses;
                this.keypoints = poses[0].pose.keypoints;
            } else {
                this.poses = [];
                this.keypoints = [];
            }
        });

        this.runtime.ioDevices.video.enableVideo();
    }

    getInfo () {
        this._locale = this.setLocale();
        return {
            id: 'posenet2scratch',
            name: 'Posenet2Scratch',
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'getX',
                    blockType: BlockType.REPORTER,
                    text: Message.getX[this._locale],
                    arguments: {
                        PERSON_NUMBER: {
                            type: ArgumentType.STRING,
                            menu: 'personNumbers',
                            defaultValue: '1'
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
                            defaultValue: '1'
                        },
                        PART: {
                            type: ArgumentType.STRING,
                            menu: 'parts',
                            defaultValue: '0'
                        }
                    }
                },
                {   opcode: 'getPeopleCount',
                    blockType: BlockType.REPORTER,
                    text: Message.peopleCount[this._locale]
                },
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
                    opcode: 'videoToggle',
                    blockType: BlockType.COMMAND,
                    text: Message.videoToggle[this._locale],
                    arguments: {
                        VIDEO_STATE: {
                            type: ArgumentType.STRING,
                            menu: 'videoMenu',
                            defaultValue: 'off'
                        }
                    }
                }
            ],
            menus: {
              personNumbers: {
                acceptReporters: true,
                items: this.PERSON_NUMBERS_MENU
              },
              parts: {
                acceptReporters: true,
                items: this.PARTS_MENU
              },
              videoMenu: {
                acceptReporters: false,
                items: this.VIDEO_MENU
              }
            }
        };
    }

    getX (args) {
      if (this.poses[parseInt(args.PERSON_NUMBER, 10) - 1] && this.poses[parseInt(args.PERSON_NUMBER, 10) - 1].pose.keypoints[parseInt(args.PART, 10)]) {
        if (this.runtime.ioDevices.video.mirror === false) {
          return -1 * (240 - this.poses[parseInt(args.PERSON_NUMBER, 10) - 1].pose.keypoints[parseInt(args.PART, 10)].position.x);
        } else {
          return 240 - this.poses[parseInt(args.PERSON_NUMBER, 10) - 1].pose.keypoints[parseInt(args.PART, 10)].position.x;
        }
      } else {
        return "";
      }
    }

    getY (args) {
      if (this.poses[parseInt(args.PERSON_NUMBER, 10) - 1] && this.poses[parseInt(args.PERSON_NUMBER, 10) - 1].pose.keypoints[parseInt(args.PART, 10)]) {
        return 180 - this.poses[parseInt(args.PERSON_NUMBER, 10) - 1].pose.keypoints[parseInt(args.PART, 10)].position.y;
      } else {
        return "";
      }
    }

    getPeopleCount () {
      return this.poses.length;
    }

    getNoseX () {
      if (this.keypoints[0]) {
        if (this.runtime.ioDevices.video.mirror === false) {
          return -1 * (240 - this.keypoints[0].position.x);
        } else {
          return 240 - this.keypoints[0].position.x;
        }
      } else {
        return "";
      }
    }

    getNoseY () {
      if (this.keypoints[0]) {
        return 180 - this.keypoints[0].position.y;
      } else {
        return "";
      }
    }

    getLeftEyeX () {
      if (this.keypoints[1]) {
        if (this.runtime.ioDevices.video.mirror === false) {
          return -1 * (240 - this.keypoints[1].position.x);
        } else {
          return 240 - this.keypoints[1].position.x;
        }
      } else {
        return "";
      }
    }

    getLeftEyeY () {
      if (this.keypoints[1]) {
        return 180 - this.keypoints[1].position.y;
      } else {
        return "";
      }
    }

    getRightEyeX () {
      if (this.keypoints[2]) {
        if (this.runtime.ioDevices.video.mirror === false) {
          return -1 * (240 - this.keypoints[2].position.x);
        } else {
          return 240 - this.keypoints[2].position.x;
        }
      } else {
        return "";
      }
    }

    getRightEyeY () {
      if (this.keypoints[2]) {
        return 180 - this.keypoints[2].position.y;
      } else {
        return "";
      }
    }

    getLeftEarX () {
      if (this.keypoints[3]) {
        if (this.runtime.ioDevices.video.mirror === false) {
          return -1 * (240 - this.keypoints[3].position.x);
        } else {
          return 240 - this.keypoints[3].position.x;
        }
      } else {
        return "";
      }
    }

    getLeftEarY () {
      if (this.keypoints[3]) {
        return 180 - this.keypoints[3].position.y;
      } else {
        return "";
      }
    }

    getRightEarX () {
      if (this.keypoints[4]) {
        if (this.runtime.ioDevices.video.mirror === false) {
          return -1 * (240 - this.keypoints[4].position.x);
        } else {
          return 240 - this.keypoints[4].position.x;
        }
      } else {
        return "";
      }
    }

    getRightEarY () {
      if (this.keypoints[4]) {
        return 180 - this.keypoints[4].position.y;
      } else {
        return "";
      }
    }

    getLeftShoulderX () {
      if (this.keypoints[5]) {
        if (this.runtime.ioDevices.video.mirror === false) {
          return -1 * (240 - this.keypoints[5].position.x);
        } else {
          return 240 - this.keypoints[5].position.x;
        }
      } else {
        return "";
      }
    }

    getLeftShoulderY () {
      if (this.keypoints[5]) {
        return 180 - this.keypoints[5].position.y;
      } else {
        return "";
      }
    }

    getRightShoulderX () {
      if (this.keypoints[6]) {
        if (this.runtime.ioDevices.video.mirror === false) {
          return -1 * (240 - this.keypoints[6].position.x);
        } else {
          return 240 - this.keypoints[6].position.x;
        }
      } else {
        return "";
      }
    }

    getRightShoulderY () {
      if (this.keypoints[6]) {
        return 180 - this.keypoints[6].position.y;
      } else {
        return "";
      }
    }

    getLeftElbowX () {
      if (this.keypoints[7]) {
        if (this.runtime.ioDevices.video.mirror === false) {
          return -1 * (240 - this.keypoints[7].position.x);
        } else {
          return 240 - this.keypoints[7].position.x;
        }
      } else {
        return "";
      }
    }

    getLeftElbowY () {
      if (this.keypoints[7]) {
        return 180 - this.keypoints[7].position.y;
      } else {
        return "";
      }
    }

    getRightElbowX () {
      if (this.keypoints[8]) {
        if (this.runtime.ioDevices.video.mirror === false) {
          return -1 * (240 - this.keypoints[8].position.x);
        } else {
          return 240 - this.keypoints[8].position.x;
        }
      } else {
        return "";
      }
    }

    getRightElbowY () {
      if (this.keypoints[8]) {
        return 180 - this.keypoints[8].position.y;
      } else {
        return "";
      }
    }

    getLeftWristX () {
      if (this.keypoints[9]) {
        if (this.runtime.ioDevices.video.mirror === false) {
          return -1 * (240 - this.keypoints[9].position.x);
        } else {
          return 240 - this.keypoints[9].position.x;
        }
      } else {
        return "";
      }
    }

    getLeftWristY () {
      if (this.keypoints[9]) {
        return 180 - this.keypoints[9].position.y;
      } else {
        return "";
      }
    }

    getRightWristX () {
      if (this.keypoints[10]) {
        if (this.runtime.ioDevices.video.mirror === false) {
          return -1 * (240 - this.keypoints[10].position.x);
        } else {
          return 240 - this.keypoints[10].position.x;
        }
      } else {
        return "";
      }
    }

    getRightWristY () {
      if (this.keypoints[10]) {
        return 180 - this.keypoints[10].position.y;
      } else {
        return "";
      }
    }

    getLeftHipX () {
      if (this.keypoints[11]) {
        if (this.runtime.ioDevices.video.mirror === false) {
          return -1 * (240 - this.keypoints[11].position.x);
        } else {
          return 240 - this.keypoints[11].position.x;
        }
      } else {
        return "";
      }
    }

    getLeftHipY () {
      if (this.keypoints[11]) {
        return 180 - this.keypoints[11].position.y;
      } else {
        return "";
      }
    }

    getRightHipX () {
      if (this.keypoints[12]) {
        if (this.runtime.ioDevices.video.mirror === false) {
          return -1 * (240 - this.keypoints[12].position.x);
        } else {
          return 240 - this.keypoints[12].position.x;
        }
      } else {
        return "";
      }
    }

    getRightHipY () {
      if (this.keypoints[12]) {
        return 180 - this.keypoints[12].position.y;
      } else {
        return "";
      }
    }

    getLeftKneeX () {
      if (this.keypoints[13]) {
        if (this.runtime.ioDevices.video.mirror === false) {
          return -1 * (240 - this.keypoints[13].position.x);
        } else {
          return 240 - this.keypoints[13].position.x;
        }
      } else {
        return "";
      }
    }

    getLeftKneeY () {
      if (this.keypoints[13]) {
        return 180 - this.keypoints[13].position.y;
      } else {
        return "";
      }
    }

    getRightKneeX () {
      if (this.keypoints[14]) {
        if (this.runtime.ioDevices.video.mirror === false) {
          return -1 * (240 - this.keypoints[14].position.x);
        } else {
          return 240 - this.keypoints[14].position.x;
        }
      } else {
        return "";
      }
    }

    getRightKneeY () {
      if (this.keypoints[14]) {
        return 180 - this.keypoints[14].position.y;
      } else {
        return "";
      }
    }

    getLeftAnkleX () {
      if (this.keypoints[15]) {
        if (this.runtime.ioDevices.video.mirror === false) {
          return -1 * (240 - this.keypoints[15].position.x);
        } else {
          return 240 - this.keypoints[15].position.x;
        }
      } else {
        return "";
      }
    }

    getLeftAnkleY () {
      if (this.keypoints[15]) {
        return 180 - this.keypoints[15].position.y;
      } else {
        return "";
      }
    }

    getRightAnkleX () {
      if (this.keypoints[16]) {
        if (this.runtime.ioDevices.video.mirror === false) {
          return -1 * (240 - this.keypoints[16].position.x);
        } else {
          return 240 - this.keypoints[16].position.x;
        }
      } else {
        return "";
      }
    }

    getRightAnkleY () {
      if (this.keypoints[16]) {
        return 180 - this.keypoints[16].position.y;
      } else {
        return "";
      }
    }

    videoToggle (args) {
      let state = args.VIDEO_STATE;
      if (state === 'off') {
        this.runtime.ioDevices.video.disableVideo();
      } else {
        this.runtime.ioDevices.video.enableVideo();
        this.runtime.ioDevices.video.mirror = state === "on";
      }
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
