export default anims => {
    anims.create({
        key: 'playerMovement',
        frames: anims.generateFrameNumbers('PlayerMovement', { start: 9, end: 15 }),
        frameRate: 15,
        repeat: -1
    })

    anims.create({
        key: 'idle',
        frames: anims.generateFrameNumbers('PlayerMovement', { start: 0, end: 8 }),
        frameRate: 8,
        repeat: -1
    })

    anims.create({
        key: 'jump',
        frames: anims.generateFrameNumbers('PlayerMovement', { start: 17, end: 22 }),
        frameRate: 8,
        repeat: -1
    })

    anims.create({
        key: 'landing',
        frames: anims.generateFrameNumbers('PlayerMovement', { start: 22, end: 23 }),
        frameRate: 4,
     
    })

    anims.create({
        key: 'sword-attack',
        frames: anims.generateFrameNumbers('swordAttack', { start: 0, end: 6 }),
        frameRate: 37,
    })

    anims.create({
        key: 'slide',
        frames: anims.generateFrameNumbers('slideSheet', { start: 0, end: 2 }),
        frameRate: 12,
    })

}