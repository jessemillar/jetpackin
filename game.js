var jetpackPower = 0.5,
    horizontalMovement = jetpackPower / 3,
    firePower = 15,
    firePowerDeviation = firePower / 20,
    gravity = jetpackPower / 2,
    friction = jetpackPower / 6;

var lorina = new l.lorina();
lorina.setTitle('Jetpackin\'')
    .setColor('#ed7656')
    .scale(300) // This is in percent
    .makeFullscreen()
    .appendCanvas();

var tool = new l.tool();
var keyboard = new l.keyboard();

var foxy = new l.entity();
foxy.setSprite('images/foxy.png', true, true, 2, 75)
    .setPosition(100, 50)
    .setAnchor(12, 12)
    .setFriction(friction)
    .setGravity(gravity);

foxy.facing = 'right';
foxy.canShoot = 'true';
foxy.reloadTime = 250;
foxy.plungers = new l.group();

var tony = new l.entity();
tony.setSprite('images/tony.png', true, true, 2, 75)
    .setPosition(l.globals.room.width - 100, 50)
    .setAnchor(12, 12)
    .setFriction(friction)
    .setGravity(gravity)
    .flip('horizontal');

tony.facing = 'left';
tony.canShoot = 'true';
tony.reloadTime = 250;
tony.plungers = new l.group();

var main = function() {
    if (keyboard.w) {
        foxy.pushVertical(-jetpackPower);
    }

    if (keyboard.a) {
        foxy.facingDirection = 'right';
        foxy.flip('horizontal').pushHorizontal(-horizontalMovement);
    } else if (keyboard.d) {
        foxy.facingDirection = 'left';
        foxy.unflip().pushHorizontal(horizontalMovement);
    }

    if (keyboard.f) {
        if (foxy.canShoot) {
            foxy.canShoot = false;

            setTimeout(function() {
                foxy.canShoot = true;
            }, foxy.reloadTime);

            var plunger = new l.entity();
            plunger.setSprite('images/plunger.png', true, true)
                .setPosition(foxy.x, foxy.y - 2)
                .setAnchor(4, 4)
                .setFriction(friction)
                .setGravity(gravity);

            if (foxy.facingDirection == 'right') {
                plunger.pushHorizontal(tool.random(-firePower - firePowerDeviation, -firePower + firePowerDeviation));
            } else {
                plunger.pushHorizontal(tool.random(firePower - firePowerDeviation, firePower + firePowerDeviation));
            }

            foxy.plungers.add(plunger);
        }
    }

    if (tool.checkCollision(foxy, tony.plungers)) {
        foxy.delete();
    }

    if (keyboard.up) {
        tony.pushVertical(-jetpackPower);
    }

    if (keyboard.left) {
        tony.facingDirection = 'left';
        tony.flip('horizontal').pushHorizontal(-horizontalMovement);
    } else if (keyboard.right) {
        tony.facingDirection = 'right';
        tony.unflip().pushHorizontal(horizontalMovement);
    }

    if (keyboard.alt) {
        if (tony.canShoot) {
            tony.canShoot = false;

            setTimeout(function() {
                tony.canShoot = true;
            }, tony.reloadTime);

            var plunger = new l.entity();
            plunger.setSprite('images/plunger.png', true, true)
                .setPosition(tony.x, tony.y - 2)
                .setAnchor(4, 4)
                .setFriction(friction)
                .setGravity(gravity);

            if (tony.facingDirection == 'right') {
                plunger.pushHorizontal(tool.random(firePower - firePowerDeviation, firePower + firePowerDeviation));
            } else {
                plunger.pushHorizontal(tool.random(-firePower - firePowerDeviation, -firePower + firePowerDeviation));
            }

            tony.plungers.add(plunger);
        }
    }

    if (tool.checkCollision(tony, foxy.plungers)) {
        tony.delete();
    }

    lorina.blank();
    foxy.contain().applyPhysics().buffer(); //.debug();
    tony.contain().applyPhysics().buffer();
    foxy.plungers.steer().stick().applyPhysics().buffer();
    tony.plungers.steer().stick().applyPhysics().buffer();
    lorina.draw();
};

lorina.start(main);
