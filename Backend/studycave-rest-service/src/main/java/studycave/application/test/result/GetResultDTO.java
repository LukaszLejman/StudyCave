package studycave.application.test.result;

public class GetResultDTO {
	private float userScore;
	private int maxScore;
	
	
	public GetResultDTO(float userScore, int maxScore) {
		super();
		this.userScore = userScore;
		this.maxScore = maxScore;
	}
	public float getUserScore() {
		return userScore;
	}
	public void setUserScore(float userScore) {
		this.userScore = userScore;
	}
	public int getMaxScore() {
		return maxScore;
	}
	public void setMaxScore(int maxScore) {
		this.maxScore = maxScore;
	}
	
	
}
