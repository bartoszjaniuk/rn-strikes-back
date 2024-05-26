import * as React from "react";

export const useFetch = <T,>(url: string) => {
	const [isFetching, setIsFetching] = React.useState(false);
	const [error, setError] = React.useState<unknown>(undefined);
	const [data, setData] = React.useState<T | undefined>(undefined);

	React.useEffect(() => {
		const fetchData = async () => {
			setIsFetching(true);
			try {
				const response = await fetch(url);
				const data: T = await response.json();
				setData(data);
			} catch (error) {
				setError(error);
			} finally {
				setIsFetching(false);
			}
		};

		fetchData();
	}, [url]);

	return { isFetching, error, data };
};
