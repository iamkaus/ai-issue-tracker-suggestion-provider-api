import { GITHUB_AUTHORIZATION_TOKEN , GITHUB_API } from "../src/config/env.config.js";

export async function fetchRepositoryDetails(owner, repository, issueNumber) {
    try {
        const url = `${GITHUB_API}/repos/${owner}/${repository}/issues/${issueNumber}`;
        console.log(`url: ${url}`);

        const response = await fetch(url, {
            headers: {
                'Authorization': GITHUB_AUTHORIZATION_TOKEN,
                'Accept': 'application/vnd.github.v3+json',
            }
        })

        if ( !response || response.status !== 200 ) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json();

        return {
            title: data.title,
            status: data.state
        }

    } catch (error) {
        console.error(`Error occurred while fetching repository details: ${error.message}`);
    }
}