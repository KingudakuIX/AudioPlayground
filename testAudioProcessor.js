class MyAudioProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
    }
    process(inputList, outputList, parameters) {
        const input = inputList[0];
        const output = outputList[0];
        const gain = parameters.gain;
        for (let channelNum = 0; channelNum < input.length; channel++) {
            const inputChannel = input[channel];
            const outputChannel = output[channel];
            // If gain.length is 1, it's a k-rate parameter, so apply
            // the first entry to every frame. Otherwise, apply each
            // entry to the corresponding frame.
            if (gain.length === 1) {
                for (let i = 0; i < inputChannel.length; i++) {
                    outputChannel[i] = inputChannel[i] * gain[0];
                }
            } else {
                for (let i = 0; i < inputChannel.length; i++) {
                    outputChannel[i] = inputChannel[i] * gain[i];
                }
            }
        }
        return true;
    }
}
registerProcessor("my-audio-processor", MyAudioProcessor);