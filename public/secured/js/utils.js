const baseUrl = window.location.protocol + "//" + window.location.host;

const verifyToken = async function(token, next) {

    if (!token) {
        window.location.href = '/secured/login.html';
        return;
    }

    fetch(baseUrl + '/secured/verifyToken', {
        method: 'POST',
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({'token': token}),
    }).then(async (res)=>{

        const json = await res.json();

        if (res.status == 200) {
            next();
        } else {
            sessionStorage.clear();
            window.location.href = '/secured/login.html';
        }

    }).catch((error) => {
        sessionStorage.clear();
        window.location.href = '/secured/login.html';
    });

}


const logout = function() {
    sessionStorage.clear();
    window.location.href = '/secured/login.html';
}

const openWindow = ({url, title, w, h}) => {

    const _w = w ?? 500;
    const _h = h ?? 700;

    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - _w) / 2 / systemZoom + dualScreenLeft
    const top = (height - _h) / 2 / systemZoom + dualScreenTop
    const newWindow = window.open(url, title, 
      `
      scrollbars=yes,
      width=${_w / systemZoom}, 
      height=${_h},
      top=${top}, 
      left=${left}
      `
    )

    //height=${_h / systemZoom}
    
    if (window.focus) newWindow.focus();
}