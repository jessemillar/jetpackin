var jetpackPower = 0.5,
    horizontalMovement = jetpackPower / 3,
    firePower = 15,
    firePowerDeviation = firePower / 20,
    gravity = jetpackPower / 2,
    friction = jetpackPower / 6;

var foxyFacingDirection = 'right',
    foxyCanShoot = true,
    foxyReloadTime = 250,
    tonyFacingDirection = 'right',
    tonyCanShoot = true,
    tonyReloadTime = 250;

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
    .setPosition(50, 50)
    .setAnchor(12, 12)
    .setFriction(friction)
    .setGravity(gravity);

var tony = new l.entity();
tony.setSprite('images/tony.png', true, true, 2, 75)
    .setPosition(150, 50)
    .setAnchor(12, 12)
    .setFriction(friction)
    .setGravity(gravity);

var plungers = new l.group();

var main = function() {
    if (keyboard.w) {
        foxy.pushVertical(-jetpackPower);
    }

    if (keyboard.a) {
        foxyFacingDirection = 'right';
        foxy.flip('horizontal').pushHorizontal(-horizontalMovement);
    } else if (keyboard.d) {
        foxyFacingDirection = 'left';
        foxy.unflip().pushHorizontal(horizontalMovement);
    }

    if (keyboard.space) {
        if (foxyCanShoot) {
            foxyCanShoot = false;

            setTimeout(function() {
                foxyCanShoot = true;
            }, foxyReloadTime);

            var plunger = new l.entity();
            plunger.setSprite('images/plunger.png', true, true)
                .setPosition(foxy.x, foxy.y - 2)
                .setAnchor(4, 4)
                .setFriction(friction)
                .setGravity(gravity);

            if (foxyFacingDirection == 'right') {
                plunger.pushHorizontal(tool.random(-firePower - firePowerDeviation, -firePower + firePowerDeviation));
            } else {
                plunger.pushHorizontal(tool.random(firePower - firePowerDeviation, firePower + firePowerDeviation));
            }

            plungers.add(plunger);
        }
    }

    if (keyboard.up) {
        tony.pushVertical(-jetpackPower);
    }

    if (keyboard.left) {
        tonyFacingDirection = 'right';
        tony.flip('horizontal').pushHorizontal(-horizontalMovement);
    } else if (keyboard.right) {
        tonyFacingDirection = 'left';
        tony.unflip().pushHorizontal(horizontalMovement);
    }

    if (keyboard.enter) {
        if (tonyCanShoot) {
            tonyCanShoot = false;

            setTimeout(function() {
                tonyCanShoot = true;
            }, tonyReloadTime);

            var plunger = new l.entity();
            plunger.setSprite('images/plunger.png', true, true)
                .setPosition(tony.x, tony.y - 2)
                .setAnchor(4, 4)
                .setFriction(friction)
                .setGravity(gravity);

            if (tonyFacingDirection == 'right') {
                plunger.pushHorizontal(tool.random(-firePower - firePowerDeviation, -firePower + firePowerDeviation));
            } else {
                plunger.pushHorizontal(tool.random(firePower - firePowerDeviation, firePower + firePowerDeviation));
            }

            plungers.add(plunger);
        }
    }

    lorina.blank();
    foxy.contain().applyPhysics().buffer();//.debug();
    tony.contain().applyPhysics().buffer();
    plungers.steer().stick().applyPhysics().buffer();
    lorina.draw();
};

lorina.start(main);
