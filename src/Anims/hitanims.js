export default hitAnims => {

    hitAnims.create({
        key: 'hit-effect',
        frames: hitAnims.generateFrameNumbers('hit-effect', { start: 0, end: 4 }),
        frameRate: 24,
    });


}