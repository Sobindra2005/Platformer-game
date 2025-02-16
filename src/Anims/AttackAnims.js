export default AttackAnims => {

    AttackAnims.create({
        key: 'snowball',
        frames: [
            { key: 'snowball-1' },
            { key: 'snowball-2' }
        ],
        frameRate: 10,
        repeat: -1
    });

    AttackAnims.create({
        key: 'snowball-impact',
        frames: [
            { key: 'snowBall-1' },
            { key: 'snowBall-2' },
            { key: 'snowBall-3' }
        ],
        frameRate: 12,
    });

    AttackAnims.create({
        key: 'fireball',
        frames: [
            { key: 'fireball-1' },
            { key: 'fireball-2' },
            { key: 'fireball-3' }
        ],
        frameRate: 10,
        repeat: -1
    });

    AttackAnims.create({
        key: 'fireball-impact',
        frames: [
            { key: 'fireballImpact-1' },
            { key: 'fireballImpact-2' },
            { key: 'fireballImpact-3' }
        ],
        frameRate: 12,
    });

    AttackAnims.create({
        key: 'throwAttack',
        frames: AttackAnims.generateFrameNumbers('throwAttack', { start: 1, end: 6 }),
        frameRate: 24,
    });
}