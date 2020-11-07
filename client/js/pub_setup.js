let player = {

};

actions = {
    ip_input_handler: (event) => {
        if (public_username_input.value && public_username_input.value) {
            if (!event.keyCode) {
                actions.ws_setup(public_ip_input.value);
                public_ip_input.blur();


            } else {
                if (event.keyCode === 13) {
                    actions.ws_setup(public_ip_input.value);
                    public_ip_input.blur();


                }
            }
        }
    },
    ws_setup: (ip) => {
        actions.ws;
        if (actions.ws) {
            actions.ws.close();
            actions.ws = undefined;
        }
        if (ip.slice(0, 9) === 'localhost' || ip === '192.168.1.157:8000') {
            actions.ws = new WebSocket(`ws://${ip}`);
        } else {
            actions.ws = new WebSocket(`wss://${ip}`);
        }



        actions.send = (backend = '', backend_params = [], frontend = true) => {
            return actions.ws.send(JSON.stringify({ backend: backend, backend_params: backend_params, frontend: frontend }));
        };

        actions.ws.onopen = () => {
            actions.send('register', [public_username_input.value], true);
        };
        actions.ws.onerror = () => {};

        actions.ws.onmessage = (message) => {
            let data = JSON.parse(message.data);
            console.log(data);
            actions[data.frontend](...data.frontend_params);
        };
    },
    register_success: (username) => {
        player.username = username;
        public_server_select.style.display = 'none';
    },
    register_fail: (username) => {
        public_username_input.value = "";
        public_username_input_failtext.innerHTML = `${username} is already taken`;
        public_username_input_failtext.style.visibility = "visible";
    },
    setup_pebble: () => {

    },
    render_map: () => {

    },
    test: (yes) => {
        console.table(yes);
    }

};

public_username_input.focus();
public_username_input.value = localStorage.getItem('public_username_input');
public_ip_input.value = localStorage.getItem('public_ip_input');

public_username_input.onblur = () => localStorage.setItem('public_username_input', public_username_input.value);
public_ip_input.onblur = () => localStorage.setItem('public_ip_input', public_ip_input.value);

public_username_input.addEventListener('keydown', event => {
    public_username_input_failtext.style.visibility = "hidden";
    if (event.keyCode === 13) {
        public_ip_input.focus();
    }
});

public_ip_input.addEventListener('keydown', actions.ip_input_handler);
public_server_submit.addEventListener('click', actions.ip_input_handler);

public_faction_select.style.display = 'none';