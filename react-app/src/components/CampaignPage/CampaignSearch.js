import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getSectionsByCampaign } from '../../store/sections';
import './CampaignPage.css';

export default function CampaignSearch() {
	const dispatch = useDispatch();
	const { campaignId } = useParams();
	const sections = useSelector((state) => state.sections);
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);
	const [showResults, setShowResults] = useState(false);

	useEffect(() => {
		dispatch(getSectionsByCampaign(campaignId));
	}, [dispatch, campaignId]);

	useEffect(() => {
		setResults([]);
		for (const section in sections) {
			if (query.length > 0) {
				sections[section].articles?.forEach((article) => {
					if (
						article.title.toLowerCase().includes(query.toLowerCase()) ||
						article.content.toLowerCase().includes(query.toLowerCase())
					) {
						setResults((prev) => [...prev, article]);
					}
				});
			}
		}
	}, [sections, query]);

	const handleRemove = (e) => {
		const searchInput = document.querySelector('#search');
		const result = document.querySelector('#result');
		const resultsContainer = document.querySelector('#results-container');

		if (e.target === searchInput) return;
		if (e.target === resultsContainer) return;
		if (e.target === result) return;
		setQuery('');
	};

	useEffect(() => {
		if (showResults === true) {
			document.body.addEventListener('click', handleRemove);
		}

		return () => document.body.removeEventListener('click', handleRemove);
	});

	return (
		<div id='campaign-search-container'>
			<label>Search</label>
			<input
				id='search'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onClick={() => setShowResults(true)}
			></input>
			{query.length > 0 && (
				<div id='results-container'>
					{results.map((result, i) => (
						<Link
							id='result'
							key={`result-${i}`}
							to={`/campaigns/${campaignId}/${result.section_id}/${result.id}`}
							onClick={() => setQuery('')}
						>
							{result.title}
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
