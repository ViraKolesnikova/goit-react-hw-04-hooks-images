export default function APIService(value, page=1) {
  return fetch(
    `https://pixabay.com/api/?key=23945532-d85dbc41bbe7fd0346797d44d&q=${value}&image_type=photo&page=${page}&per_page=12&orientation=horizontal`,
  )
    .then(response =>  response.json())    
}
