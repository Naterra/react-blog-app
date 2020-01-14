import React from 'react';

class Footer extends React.Component {
	render() {
		return (
			<footer className="footer">
				<div className="container row">
					<div className="socLinks col s12">
						<h5 />

						<ul className="socialIcons right">
							<li>
								<a target="_blank" href="https://www.facebook.com">
									<img src="/static/social_icons/Facebook Y.png" />
								</a>
							</li>
							<li>
								<a target="_blank" href="https://www.instagram.com">
									<img src="/static/social_icons/Instagram Y.png" />
								</a>
							</li>
							<li>
								<a target="_blank" href="https://www.patreon.com">
									<img src="/static/social_icons/Patreon Y.png" />
								</a>
							</li>
							<li>
								<a target="_blank" href="https://twitter.com">
									<img src="/static/social_icons/Twitter Y.png" />
								</a>
							</li>

							<li>
								<a target='_blank' href='https://youtube.com'>
									<img  src='/static/social_icons/Youtube Y.png'/>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<style jsx>{`
				    .socLinks{padding: 0;}
					.socLinks li {
						padding: 0 10px 0 10px;
						float: left;
					}
					.socialIcons img {
						height: 20px;
					}
				`}</style>
			</footer>
		);
	}
}

export default Footer;
