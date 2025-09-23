const body = document.querySelector('.body');

const reviewCard = document.querySelector('.review-card');

const videoPlayBtn = document.querySelector('.video-play-btn');

const url = '/.netlify/functions/fetch-testimonial';

const renderReviewVideo = async () => {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			console.log('No data sent');

			if (videoPlayBtn) {
				videoPlayBtn.addEventListener('click', () => {
					alert('video not available. Reload page!');
				});
			}
		} else {
			const data = await response.json();

			const item = data.data.items[0]; // First testimonial entry
			const reviewerName = item.fields.nameOfReviewer;

			const videoId = item.fields.testimonialVideo.sys.id;

			const asset = data.data.includes.Asset.find(
				(asset) => asset.sys.id === videoId
			);

			const videoUrl = `https:${asset.fields.file.url}`;

			if (reviewCard) {
				alert('video card present');

				reviewCard.innerHTML = `
            <div class="video-container">
              <video controls>
                <source src="${videoUrl}" type="video/mp4">
                Your browser does not support the video tag.
              </video> 
            </div> 
          `;

				// reviewVideoModal.classList.add('show-video');

				// const videoCloseBtn = document.querySelector('.video-close-btn');
				// const videoContainer = document.querySelector('.video-container');
			}
		}
	} catch (error) {
		console.error(error, 'Error');
	}
};

export { renderReviewVideo };
