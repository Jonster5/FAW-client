/* eslint-disable no-undef */
join_game_button.addEventListener('click', event => {
  title_container.style.display = 'none'
  game_container.style.display = 'flex'
  assets['js/pub_setup.js'].execute()
})

freeplay_button.addEventListener('click', event => {
  assets['js/pri_setup.js'].execute()
})

tutorial_button.addEventListener('click', event => {
  console.log('WIP')
})

more_stuff_button.addEventListener('click', event => {
  console.log('WIP')
})
