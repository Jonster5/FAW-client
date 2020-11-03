actions = {
    ip_input_handler: (event) => {
        if (event.keyCode === 13 || public_username_input.value && public_username_input.value) {
            actions.ws_setup(public_ip_input.value);
            public_ip_input.blur();
            public_server_select.style.display = "none";
        }
    },
    ws_setup: (ip) => {
        actions.ws;
        if (actions.ws) {
            actions.ws.close();
            actions.ws = undefined;
        }
        if (ip.slice(0, 9) === "localhost" || ip === "192.168.1.157:8000") {
            actions.ws = new WebSocket(`ws://${ip}`);
        } else {
            actions.ws = new WebSocket(`wss://${ip}`);
        }

        actions.ws.onopen = () => {};
        actions.ws.onerror = () => {};

        actions.send = (backend = "", backend_params = [], frontend = true) => {
            return actions.ws.send(JSON.stringify({ backend: backend, backend_params: backend_params, frontend: frontend }));
        };

        actions.ws.onmessage = (message) => {
            let data = JSON.parse(message.data);

            actions[data.frontend](...data.frontend_params);
        }
    },
    register_success: (username) => {

    },
    register_fail: (username) => {

    }

};

public_username_input.focus();
public_username_input.value = localStorage.getItem("public_username_input");
public_ip_input.value = localStorage.getItem("public_ip_input");

public_username_input.onblur = () => localStorage.setItem("public_username_input", public_username_input.value);
public_ip_input.onblur = () => localStorage.setItem("public_ip_input", public_ip_input.value);

public_username_input.addEventListener("keydown", event => {
    if (event.keyCode === 13) {
        public_ip_input.focus();
    }
});

public_ip_input.addEventListener("keydown", actions.ip_input_handler);
public_server_submit.addEventListener("click", actions.ip_input_handler);