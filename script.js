key = "api_key=HvZzMCkpcc1Q661bJpbW9UDhg3KehDS9xe8XNcwY"
const pictureOfTheDayUrl = "https://api.nasa.gov/planetary/apod?"
const marsRoversPhotosUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&"
const audioQuery = "https://images-api.nasa.gov/search?q=apollo%2011&description=moon%20landing&media_type=audio"
const imageQuery = "https://images-api.nasa.gov/search?q=apollo%2011&description=moon%20landing&media_type=image"
const audioType = "media_type=audio"
const imageType = "media_type=image"

audiosList = []
imagesList = []
marsPhotos = []

const placeholderSidebar = document.getElementById('placeholder-sidebar')

const astronomyPictureOfTheDayText = document.getElementById('apod')
const astronomyPictureOfTheDayTitle = document.getElementById('apod-title')
const astronomyPictureOfTheDayExplanation = document.getElementById('apod-explanation')
const astronomyPictureOfTheDayImage = document.getElementById('apod-image')
const sidebar = document.getElementById('sidebar')

const marsRoversPhotosText = document.getElementById('marsRoversPhotos')
const roversSidebar = document.getElementById('rovers-sidebar')
const roversSidebarContent = document.getElementById('rovers-sidebar')
                            .getElementsByClassName('sidebar-content')[0]

const marsWeatherText = document.getElementById('marsWeatherService')
const marsWeatherSidebar = document.getElementById('weather-sidebar')

const audioGalleryText = document.getElementById('audioGallery')
const audioGallerySidebar = document.getElementById('audio-sidebar')
const audioGallerySidebarContent = document.getElementById('audio-sidebar')
                            .getElementsByClassName('sidebar-content')[0]

const imageGalleryText = document.getElementById('imageGallery')
const imageGallerySidebar = document.getElementById('image-sidebar')
const imageGallerySidebarContent = document.getElementById('image-sidebar')
                            .getElementsByClassName('sidebar-content')[0]

astronomyPictureOfTheDayText.onclick = getAstronomyPictureOfTheDay
marsRoversPhotosText.onclick = getMarsRoversPhotos
audioGalleryText.onclick = getAudioByInput
imageGalleryText.onclick = getImageByInput


function anySidebarOpen() {
    sidebarOpen = 
        sidebar.classList.contains('slide-in') || 
        roversSidebar.classList.contains('slide-in') ||
        audioGallerySidebar.classList.contains('slide-in') ||
        imageGallerySidebar.classList.contains('slide-in')

    return sidebarOpen
}

function closeAllSidebars() {
    sidebar.setAttribute('class', 'slide-out')
    roversSidebar.setAttribute('class', 'slide-out')
    audioGallerySidebar.setAttribute('class', 'slide-out')
    imageGallerySidebar.setAttribute('class', 'slide-out')

}

async function getAstronomyPictureOfTheDay() {
    const response = await fetch(pictureOfTheDayUrl + key)
    const picture = await response.json()

    astronomyPictureOfTheDayTitle.innerText = picture.title
    astronomyPictureOfTheDayExplanation.innerText = picture.explanation
    astronomyPictureOfTheDayImage.src = picture.url

    isOpen = sidebar.classList.contains('slide-in')

    if (anySidebarOpen() && !isOpen) {
        closeAllSidebars()
    }

    sidebar.setAttribute('class', isOpen ? 'slide-out' : 'slide-in')
}

async function getMarsRoversPhotos() {
    const response = await fetch(marsRoversPhotosUrl + key)
    const object = await response.json()
    const marsRefs = object.photos
    
    if (marsPhotos.length === 0) {
        marsPhotos = marsRefs.length > 10 ? marsRefs.slice(0, 9) : marsRefs
        marsPhotos.forEach(photo => {
            createRoversPhotoElement(photo)
        });
    }

    isOpen = roversSidebar.classList.contains('slide-in')
    if (anySidebarOpen() && !isOpen) { closeAllSidebars() }

    roversSidebar.setAttribute('class', isOpen ? 'slide-out' : 'slide-in')
}

function createRoversPhotoElement(photo) {
    const roversPhotoElement = document.createElement("div")
    const image = document.createElement("img")
    image.src = photo.img_src
    const roverName = document.createElement("h5")
    roverName.appendChild(document.createTextNode("Rover name: " + photo.rover.name))
    const cameraName = document.createElement("h5")
    cameraName.appendChild(document.createTextNode("Camera: " + photo.camera.full_name))
    const earthDate = document.createElement("h5")
    earthDate.appendChild(document.createTextNode("Earth date: " + photo.earth_date))

    roversPhotoElement.appendChild(roverName)
    roversPhotoElement.appendChild(cameraName)
    roversPhotoElement.appendChild(earthDate)
    roversPhotoElement.appendChild(image)

    roversSidebarContent.appendChild(roversPhotoElement)
}

async function getAudioByInput() {
    const response = await fetch(audioQuery)
    const object = await response.json()
    const audioRefs = object.collection.items

    if (audiosList.length === 0) {
        audiosList = audioRefs.length > 10 ? audioRefs.slice(0, 9) : audioRefs
        audiosList.forEach(audio => {
            createAudioElement(audio)
        });
    }

    isOpen = audioGallerySidebar.classList.contains('slide-in')
    if (anySidebarOpen() && !isOpen) { closeAllSidebars() }

    audioGallerySidebar.setAttribute('class', isOpen ? 'slide-out' : 'slide-in')
}

async function createAudioElement(audio) {
    const response = await fetch(audio.href)
    const audios = await response.json()
    const audioUrl = audios[0]

    const audioElement = document.createElement("div")

    const audioTitle = document.createElement("h5")
    audioTitle.appendChild(document.createTextNode(audio.data[0].title))

    const audioPlayer = document.createElement("audio")
    audioPlayer.src = audioUrl
    audioPlayer.controls = 'controls'

    audioElement.appendChild(audioTitle)
    audioElement.appendChild(audioPlayer)

    audioGallerySidebarContent.appendChild(audioElement)
}

async function getImageByInput() {
    const response = await fetch(imageQuery)
    const object = await response.json()
    const imageRefs = object.collection.items
    
    if (imagesList.length === 0) {
        imagesList = imageRefs.length > 10 ? imageRefs.slice(0, 9) : imageRefs
        imagesList.forEach(image => {
            createImageElement(image)
        });
    }
    
    isOpen = imageGallerySidebar.classList.contains('slide-in')
    if (anySidebarOpen() && !isOpen) { closeAllSidebars() }
    
    imageGallerySidebar.setAttribute('class', isOpen ? 'slide-out' : 'slide-in')
}

async function createImageElement(image) {
    const response = await fetch(image.href)
    const images = await response.json()
    const imageUrl = images[1]

    const imageElement = document.createElement("div")

    const imageTitle = document.createElement("h5")
    imageTitle.appendChild(document.createTextNode(image.data[0].title))

    const imageFile = document.createElement("img")
    imageFile.src = imageUrl

    const imageDescription = document.createElement("p")
    imageDescription.appendChild(document.createTextNode(image.data[0].description))

    imageElement.appendChild(imageTitle)
    imageElement.appendChild(imageFile)
    imageElement.appendChild(imageDescription)

    imageGallerySidebarContent.appendChild(imageElement)
}






