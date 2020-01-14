import React from 'react';

class Parallax extends React.Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();

		this.instance = null;
	}

	componentDidMount() {
		const elems = this.myRef.current;
		this.instance = M.Parallax.init(elems, {});
	}
	componentDidUpdate() {
		const elems = this.myRef.current;
		this.instance = M.Parallax.init(elems, {});
	}

	render() {
		const {image } = this.props;
		return (
			<div className="row">
				<div ref={this.myRef} className="parallax-container">
					<div className="parallax">
						<img className="" alt="parallax" src={image} />
					</div>
				</div>
				<style jsx>{`
					.row {
						position: sticky;
						// width: 100%;
						// margin: 0;
					}
				`}</style>
			</div>
		);
	}
}

export default Parallax;
