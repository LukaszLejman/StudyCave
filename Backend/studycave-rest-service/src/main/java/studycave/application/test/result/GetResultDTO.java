package studycave.application.test.result;

public class GetResultDTO {
	private int userScore;
	private int maxScore;
	
	
	public GetResultDTO(int userScore, int maxScore) {
		super();
		this.userScore = userScore;
		this.maxScore = maxScore;
	}
	public int getUserScore() {
		return userScore;
	}
	public void setUserScore(int userScore) {
		this.userScore = userScore;
	}
	public int getMaxScore() {
		return maxScore;
	}
	public void setMaxScore(int maxScore) {
		this.maxScore = maxScore;
	}
	
	
}
