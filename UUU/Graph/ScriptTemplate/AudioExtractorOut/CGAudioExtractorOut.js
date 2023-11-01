/**
 * @file CGAudioExtractorOut.js
 * @author
 * @date 2021/12/30
 * @brief CGAudioExtractorOut.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const Amaz = effect.Amaz;
const {BaseNode} = require('./BaseNode');

class CGAudioExtractorOut extends BaseNode {
  constructor() {
    super();
    this.audioNode = null;
    this.audioGainNode = null;
    this.audioNodeName = 'SinkNode';
    this.audioGraph = null;
  }

  setInput(index, func) {
    this.inputs[index] = func;
  }

  initAudio() {
    if (this.audioGraph) {
      this.audioGainNode = this.audioGraph.createAudioNode('GainNode', null);
      this.audioGainNode.gain = 0;
      this.audioNode = this.audioGainNode;
      if (this.sinkNode) {
        this.audioGainNode.connect(this.sinkNode);
        if (this.onlineMusicSpeaker === false) {
          this.audioGainNode.pout(0).connect(this.sinkNode.pin(1));
        }
      } else {
        console.error('CGAudioExtractorOut Node connection error: can not connection to sinknode');
      }
    }
  }
}

exports.CGAudioExtractorOut = CGAudioExtractorOut;
