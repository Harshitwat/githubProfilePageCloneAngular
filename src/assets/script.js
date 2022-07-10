let opened = false;
const sidebar = document.getElementById('nav-links');
function $(id) {
	const _id = document.getElementById(id);
	return _id;
}
// Main Function To Load When DOM is ready...
const main = () => {
	const main = document.getElementById('main');
	main.addEventListener('mousedown', () => {
		if (opened === true) {
			opened = false;
			return sidebar.classList.remove('open');
		}
		return;
	})
	let input;
	$('search-box').addEventListener('keyup', (e) => {
		input = e.target.value;
		$: inputVariable = e.target.value;
		$('search-snippet').style.display = 'block';
		$('search-snippet').innerHTML = `
		<div style="">${inputVariable}</div>
		`;
		if (inputVariable === '') {
			$('search-snippet').style.display = 'none';
		}
		console.log(e.target.value)
	})

	const getUserProfile = async() => {
		try {
			const res = await fetch('https://api.github.com/users/shreeramk');
			return res.json();
		} catch(err) {
			if(err) {
				console.log(err)
			}
		}
	};

	const getRepositories = async() => {
		try {
			const res = await fetch('https://api.github.com/users/shreeramk/repos');
			return res.json();
		} catch(err) {
			if(err) {
				console.log(err)
			}
		}
	}
	getUserProfile()
	.then(({login, name, bio}) => {
		$('name').innerText = name;
		$('repo-name').innerText = login;
		$('biography').innerText = bio;
	})

	getRepositories()
	.then(data => {
		if (data) {
			$('counter').innerText = data.length;
		} else {
			$('counter').style.display = 'none'
		}
		data.map(({name, description, forks, html_url}, i) => {
	$('repositories').innerHTML += `
		<div class="card">
					<div class="card-left">
							<a href=${html_url} target="_blank" class="repo">${name || 'David Briggs'}</a>
							<div class="repo-description">
								${description ? description : ''}
							</div>
							<div class="encodings">
								<span>Javascript</span>
								<span id="github-stars"><div class="github-stars fa fa-star"></div>22</span>
								${forks ? '<span class="forks">'+forks+'</span>' : ''}
							</div>
					</div>
					<div class="card-right">
						<button class="star-btn">
							<div class="fa fa-star"></div>
							Star
						</button>
					</div>
				</div>
	`
		})
	})
}

// Toggle Menu Function...
function tabToggle() {
	if(opened === false) {
		opened = true;
		sidebar.classList.add('open')
	}
	else if(opened === true) {
		opened = false
		sidebar.classList.remove('open')
	}
}

// Await For DOM Content To Be ready..
document.addEventListener('DOMContentLoaded', main);
