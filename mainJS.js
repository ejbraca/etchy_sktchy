initiate();


// Initializes buttons and populates etchy_sketchy with 30x30
// block
function initiate() {
    populate_es_container(30);
    document.getElementById("reset_button").addEventListener('click', refresh, true);
    document.getElementById("block_size_alert_button").addEventListener('click', () => {
        let user_input = prompt("How many?", "16");
        if (!isNaN(user_input) && (user_input>0)) {
            let es_container = document.querySelector('.es_container');
            remove_all_children(es_container);
            populate_es_container(user_input);
        }
    })
}

// This function will populate the container with
// blocks. Initially the user will input a number of 
// blocks on the side, which we will divide into 960px 
//(size of container).

function populate_es_container(number_blocks) {
    const body = document.querySelector('body');
    let es_container = document.querySelector('.es_container');
    
    let es_block; 
    let es_block_size = 480/number_blocks;
    
    body.removeChild(es_container);
    for (i=0; i < Math.pow(number_blocks,2); i++) {
        es_block = es_block_create(es_block_size);
        es_container.appendChild(es_block);
    }
    body.appendChild(es_container);
}

// Will refresh the etchy sketchy container so that it's
// blank
function refresh() {
    let es_container = document.querySelector('.es_container');

    let es_block_size_raw = document.querySelector(".es_block").style.width;
    let es_block_size = es_block_size_raw.slice(0,es_block_size_raw.length-2);
    
    remove_all_children(es_container);
    populate_es_container(480/es_block_size);
}

// Creates
function es_block_create(block_size) {
    let block_id = document.createElement('div');

    block_id.classList.add('es_block');
    block_id.style.width = `${block_size}px`;
    block_id.style.height = `${block_size}px`;
    

    block_id.addEventListener('mouseover', function _block_mouseover() {
        block_id.style.backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        block_id.removeEventListener('mouseover', _block_mouseover, true);
    }, true);
    return block_id;
}

function remove_all_children(parent_node) {
    while (parent_node.firstChild) {
        parent_node.removeChild(parent_node.firstChild)
    }
}