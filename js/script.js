var vm = avalon.define({
    $id: 'fuyuko',
    img_list: [],
    show_image_url: '',
    category: '1',
    middle_image_name: '',
    middle_image_desc: '',
    load_image: false,
    

    show_middle_image: function (img) {
        console.log($(window).width());
        if ($(window).width() > 720) {
            vm.show_image_url = "";
    
            // 计算窗口的中间位置
            var win_height = $(window).scrollTop() - ($(window).height() / 4);
            vm.show_image_url = img.middle;
            vm.middle_image_desc = img.desc;
            vm.middle_image_name = img.name;
            var pic = $('#middle_picture');
            console.log("win:", win_height);
            pic.fadeIn({
                duration: 500
            });
            vm.load_image = true;
            // 设置中间图片的顶部位置
            pic.css('top', win_height - 225 + 'px'); // assuming height of image container is 450px
    
            var img_dom = $('#middle_image');
            vm.load_image = false;
    
            // 根据图片的尺寸设置显示方式
            if (img.small_height > img.small_width) {
                img_dom.css('margin-left', $(window).width() / 6 + 'px');
                img_dom.css('height', img.middle_height * 0.6 + 'px');
                img_dom.css('width', img.middle_width * 0.6 + 'px');
            } else {
                img_dom.css('margin-left', '0');
                img_dom.css('height', 'auto');
                img_dom.css('width', '80%');
            }
    
            console.log('Image URL:', vm.show_image_url);
            console.log('Image Description:', vm.middle_image_desc);
            console.log('Image Name:', vm.middle_image_name);
        }
    },
    show_photo_desc: function (img) {
        img.show_desc = true;
        $('.photo_desc').css("margin-top", '0px');
        $('.photo_desc').animate({marginTop: '-50px'});
    },

    hide_photo_desc: function (img) {
        img.show_desc = false;
        $('.photo_desc').css("margin-top", '0px');
    }

});

$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var category = urlParams.get('category');
    if (category) {
        vm.category = category;
    }
    $('#middle_picture').fadeOut({
        duration: 10
    });
    image_json.forEach(function (item) {
        //console.log(item);
        item['flex'] = item.small_width * 200 / item.small_height;
        item['show_desc'] = false;
        if (item.type === category) {
            vm.img_list.push(item);
        } 
    });
    // var index = 1;
    // setInterval(function () {
    //     var attr = "url('https://raw.githubusercontent.com/Amadeuszhao/Amadeuszhao.github.io/main/images/NewYork/1.JPG')";
    //     console.log(attr);
    //     $('.banner').css("backgroundImage", attr);
    //     index += 1;
    //     if (index > 4) {
    //         index = 1;
    //     }
    // }, 60000);
    $('#count_day').html(get_days() + '<p class="days">days</p>');
    setInterval(function () {
        var days = get_days();
        console.log(days);
        $('#count_day').html(days + '<p class="days">days</p>')
    }, 60000);


    $(document).dblclick(function () {
        var pic = $('#middle_picture');
        pic.fadeOut({
            duration: 500
        })
    });
    document.getElementById('middle_image').onload = function (e) {
        vm.load_image = false;
    }

});


function hide_image() {
    var pic = $('#middle_picture');
    pic.fadeOut({
        duration: 500
    })
}

function get_days() {
    var begin = new Date("2022/06/24");
    var s2 = new Date();
    var days = ((s2.getTime() - begin.getTime()) / (1000 * 60 * 60 * 24)).toFixed(0);
    return days;
}





