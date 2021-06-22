//const BASE_URL = 'http://localhost:8080'

const BASE_URL = 'https://vlad-diagnostic-diabetes-front.herokuapp.com'

export const API_URL = (slug) => `${BASE_URL}/${slug}` 

export const API_ML = 'https://vlad-diagnostic-diab-ml-python.herokuapp.com/predict'
