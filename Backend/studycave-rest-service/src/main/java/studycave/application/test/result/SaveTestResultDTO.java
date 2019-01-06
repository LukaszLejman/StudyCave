package studycave.application.test.result;



import com.fasterxml.jackson.annotation.JsonProperty;

public class SaveTestResultDTO {
	private String owner;
	@JsonProperty(value="id")
	private Long idTest;
	private float userScore;
	
	public SaveTestResultDTO() {
		super();
	}
	
	public String getOwner() {
		return owner;
	}
	public void setOwner(String owner) {
		this.owner = owner;
	}
	public Long getIdTest() {
		return idTest;
	}
	public void setIdTest(Long idTest) {
		this.idTest = idTest;
	}
	public float getUserScore() {
		return userScore;
	}
	public void setUserScore(float userScore) {
		this.userScore = userScore;
	}
	
	
	
}
