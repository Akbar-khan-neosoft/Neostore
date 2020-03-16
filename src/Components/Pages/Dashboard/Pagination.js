import React, { Component } from 'react';

const Pagination = ({ totalPosts, cardsPerPage, paginate }) => {
	const pageNumber = [];

	for (let i = 1; i <= Math.ceil(totalPosts / cardsPerPage); i++) {
		pageNumber.push(i);
	}

	return (
		<nav>
			<ul className="pagination">
				{pageNumber.map(res => (
					<li key={totalPosts + res} className="page-item">
						<button
							onClick={() => {
								return paginate(res);
							}}
							href="!#"
							className="page-link"
						>
							{res}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;
