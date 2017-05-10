var App = function() {
    this.app = "#app";
    this.scroll = 0;
    this.currentScrolling = 0;
    this.scrollTo = 0;
};

App.prototype.bind = function() {

    document.querySelector('.close-nav').addEventListener('click', transitions.toggleNav)
    document.querySelector('.open-nav').addEventListener('click', transitions.toggleNav)


    this.bindAppLinks();

    var _this = this

    if(window.innerWidth >= 1155) {
        window.addEventListener('popstate', function () {
            _this.onpopstate(_this)
        })

        // document.addEventListener('mousewheel', function(e) {
        //     e.preventDefault()
        //     _this.currentScrolling = e.deltaY;
        //     app.scrollTo= false;
        // })

        document.addEventListener('wheel', function(e) {
            e.preventDefault()
            _this.currentScrolling = e.deltaY;
            app.scrollTo= false;
        })


        document.querySelector('.scroll-dragging').addEventListener('mousedown', function(e) {
            scrollbarClicked = true;
            $("body").addClass('noselect scrolling-bar');
        });
        window.addEventListener('mouseup', function() {
           scrollbarClicked = false;
            $("body").removeClass('noselect scrolling-bar')
        });
        document.addEventListener('mousemove', function(e) {

            if(scrollbarClicked) {
                app.scrollTo = true;
                var maxHeight = document.querySelector('#app').offsetHeight - window.innerHeight + 70;
                var addToScroll = 70 * (e.clientY/window.innerHeight);
                var scrollbarPercent = (e.clientY+addToScroll - 70)/ (window.innerHeight);
                mouseY = maxHeight * scrollbarPercent;
            }

        });
    }
    this.bindProject();
}

App.prototype.bindProject = function() {
    if(window.innerWidth > 1000) {
        $('.embed-container').on('click',function () {
            $('.embed-container iframe').css("pointer-events", "auto");
        }).on('mouseleave','iframe',function(){
            $('.embed-container iframe').css("pointer-events", "none");
        });

    }
    $(".single-content-text p img").parent().addClass('full-width')
}

App.prototype.init = function(bodyClass) {

    bodyClass = bodyClass || document.querySelector('body').className;
    TweenMax.fromTo('body',0.5,{opacity:0},{opacity:1});
    transitions.checkPage(bodyClass);


    $(".to-top").on('click', function(e) {
        e.preventDefault();
        transitions.toTop()
    })
}

App.prototype.onpopstate = function(_this) {
    var button = {
        href:window.location.href,
        dataset: {}
    }

    _this.callPage(button,_this)
}

App.prototype.bindAppLinks = function() {
    var _this = this
    $(".ajax-link").on('click',function(e) {
        e.preventDefault()

        _this.callPage(this,_this)
    })
}

App.prototype.callPage = function(button,_this) {
    var link = button.href
    var hasData = button.dataset.project

    if(typeof hasData != 'undefined' && window.innerWidth >= 1155) {
        return this.callProject(button,_this)
    }

    $("body").removeClass();
    TweenMax.fromTo('body',0.4,{opacity:1},{opacity:0,onComplete:function() {
        transitions.toTop()
        $.get(link + '?ajax=1',function(data) {
            var html = JSON.parse(data).html;
            var bodyClass = JSON.parse(data).class;

            $(_this.app).html(html);
            $("body").addClass(bodyClass);

            window.history.pushState({}," ",link)
            _this.init(bodyClass)

            if($(".single-content-text")) {
                _this.bindProject();
            }

            $("#app .ajax-link").on('click',function(e) {
                e.preventDefault()
                _this.callPage(this,_this)
            })

        }).fail(function() {
            window.location.href = link;
        });
    }});
}

App.prototype.callProject = function(button, _this) {


    var link = button.href;
    $("body").removeClass();
    $(button).parent().addClass('active');

    var elements = [
        document.querySelector('.section-container-title'),
        document.querySelector('.project-card.active .project-card_arrow'),
        document.querySelector('.project-card.active h2'),
        document.querySelector('.project-card.active p')
    ];
    var projects = document.querySelectorAll('.project-card');

    for(var i=0;i<projects.length; i++) {

        if(!$(projects[i]).hasClass('active')) {
            TweenMax.to(projects[i],0.3,{opacity:0})
        }
    }
    TweenMax.staggerTo(elements,0.3,{opacity:0},0.1)

    setTimeout(function() {

        button.style.width = button.offsetWidth + 'px'
        button.style.position = 'fixed';
        // $(button).addClass('section-container');
        transitions.toTop();

        var timeline = new TimelineMax({onComplete: function() {
            $.get(link + '?ajax=1', function (data) {
                setTimeout(function() {
                    var html = JSON.parse(data).html;
                    var bodyClass = JSON.parse(data).class;


                    $(_this.app).html(html);
                    $("body").addClass(bodyClass);

                    window.history.pushState({}, " ", link)

                    _this.bindProject()

                    var timeline = new TimelineMax({})
                    timeline
                        .fromTo([
                            document.querySelector('.title.content-container'),
                            document.querySelector('.single-background')
                        ],0.5,{opacity:0},{opacity:1})
                        .staggerFromTo([
                            document.querySelector('.single-content-text'),
                            document.querySelector('.project-year')
                        ],0.5,{opacity:0},{opacity:1},0.5);

                    $("#app .ajax-link").on('click', function (e) {
                        e.preventDefault()
                        _this.callPage(this, _this)
                    })


                    $(".to-top").on('click', function(e) {
                        e.preventDefault();
                        transitions.toTop()
                    });
                },500)

            }).fail(function() {
                window.location.href = link;
            });
        }});
        timeline
            .to(button,0.4,{top:'400px'})
            .set('.project-card_cover',{position:'absolute',left:'0',right:'0'})
            .call( function() {
                TweenMax.to(button,0.5,{width:'100%',margin:'0 auto',maxWidth:'1200px',left:'0',right:'0',height:'100%'})
                TweenMax.to('.project-card_cover',0.5,{transform:'translate(-400px,-160px'})
            });

    },400)
}