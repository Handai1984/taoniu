cc.Class({
    extends: cc.Component,

    properties: {
        rope: {
            type: cc.Node,
            default: null,
        },
        cow_Prefab: {
            type: cc.Prefab,
            default: null,
        },
        cow_root: {
            type: cc.Node,
            default: null,
        },
        rope_imgs: {
            type: cc.SpriteFrame,
            default: [],
        },
        rope_sprite: {
            type: cc.Sprite,
            default: null,
        },
        scoreText: {
            type: cc.Label,
            default: null
        },
        btnStart: {
            type: cc.Node,
            default: null
        },

        nodeGameOver: {
            type: cc.Node,
            default: null
        },
        nodeThrow:{
            type: cc.Node,
            default: null
        }

    },

    // onLoad() {
    //     this.preloadedInterstitial = null;
    
    //     FBInstant.getInterstitialAdAsync(
    //         '1069674836519555_1098619673625071', // Your Ad Placement Id
    //     ).then(function (interstitial) {
    //         // Load the Ad asynchronously
    //         this.preloadedInterstitial = interstitial;
    //         return this.preloadedInterstitial.loadAsync();
    //     }).then(function () {
    //         console.log('Interstitial preloaded')
    //     }).catch(function (err) {
    //         console.error('Interstitial failed to preload: ' + err.message);
    //     });
    // },

    ShowInterstitial() {
        console.log("我是插屏");
        var preloadedInterstitial = null;
       
        FBInstant.getInterstitialAdAsync(
            '1069674836519555_1098619673625071', // Your Ad Placement Id
        ).then(function (interstitial) {
            // Load the Ad asynchronously
            preloadedInterstitial = interstitial;
            return preloadedInterstitial.loadAsync();
        }).then(function () {
            console.log('Interstitial preloaded')
            return preloadedInterstitial.showAsync();
        }).catch(function (err) {
            console.error('Interstitial failed to preload: ' + err.message);
        });
    
    // preloadedInterstitial.showAsync()
    //     .then(function () {
    //         // Perform post-ad success operation
    //         console.log('Interstitial ad finished successfully');
    //     })
    //     .catch(function (e) {
    //         console.error(e.message);
    //     });
    },
 
    start() {
        this.score = 0;
        this.scoreText.string = this.score.toString();
        // this.rope.y = -560;
        this.is_throwing = false;
        this.rope_sprite.SpriteFrame = this.rope_imgs[0];
        console.log(this.rope_sprite);

    },
    //生成一头牛
    gen_one_cow() {
        var cow = cc.instantiate(this.cow_Prefab);
        this.cow_root.addChild(cow);
        cow.x = 550;
        cow.y = -66;

        var timer = 3 + Math.random() * 2;
        this.scheduleOnce(this.gen_one_cow.bind(this), timer);
    },
    hit_test() {
        for (var i = 0; i < this.cow_root.childrenCount; i++) {
            var cow = this.cow_root.children[i];
            if (cow.x >= 90 && cow.x <= 148) {
                console.log(cow.x);
                return cow;
            }
        }
        return null;
    },

    gameOver() {
        this.nodeThrow.active = false;
        this.nodeGameOver.active = true;
        this.unscheduleAllCallbacks();
        //谷歌广告
        //jsb.reflection.callStaticMethod("AppController","game2NativeShow");
        // cc.director.loadScene("game_scene");
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","showInter","()V");
        this.ShowInterstitial();//显示fb广告
    },

    on_throw_button_chick() {
        if (this.is_throwing) {
            return;
        }
        this.is_throwing = true;
        this.rope.y = -560;
        this.rope_sprite.spriteFrame = this.rope_imgs[0];
        console.log('我换皮肤了');

        //Action
        var m1 = cc.moveTo(0.5, cc.p(0, 47));
        var mid_func = cc.callFunc(function () {
            var cow = this.hit_test();
            if (cow) { //套牛成功
                console.log(cow)
                var cow_type = cow.getComponent("cow").c_type;
                cow.removeFromParent();
                this.rope_sprite.spriteFrame = this.rope_imgs[cow_type];
                this.rope.y = 147;
                this.score++;
                this.scoreText.string = this.score.toString();
            } else
                this.gameOver();
        }.bind(this));
        var m2 = cc.moveTo(0.5, cc.p(0, -560));

        var end_func = cc.callFunc(function () {


            this.is_throwing = false;
        }.bind(this));
        var seq = cc.sequence([m1, mid_func, m2, end_func]);
        this.rope.runAction(seq);
    },
    //游戏开始
    onStartGame() {
        this.nodeThrow.active = true;
        this.btnStart.active = false;
        this.nodeGameOver.active = false;
        this.gen_one_cow();
    },

    onReStart(){
       cc.director.loadScene("game_scene");
       
    }


});