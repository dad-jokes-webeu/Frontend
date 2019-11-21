const herokuBaseURL = "https://dadjokes-api.herokuapp.com/api/";
const localhostBaseURL = "http://localhost:5000/api/";

// this allows react to figure out
// whether to use local or heroku URL for the calls to the API
export default function withBaseURL(endpoint) {
	return process.env.NODE_ENV === "production"
		? herokuBaseURL
		: herokuBaseURL;
}
