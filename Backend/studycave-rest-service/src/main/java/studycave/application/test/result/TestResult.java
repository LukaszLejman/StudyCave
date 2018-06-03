package studycave.application.test.result;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class TestResult {
	@Id
	@Column(name="id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long idResult;
	@Column(name="id_owner")
	private Long idOwner;
	@Column(name="id_test")
	private Long idTest;
	private int userScore;
	private int maxScore;
	
	
	
	
	
	
	public TestResult() {
		super();
	}
	public Long getIdResult() {
		return idResult;
	}
	public void setIdResult(Long idResult) {
		this.idResult = idResult;
	}
	public Long getIdOwner() {
		return idOwner;
	}
	public void setIdOwner(Long idOwner) {
		this.idOwner = idOwner;
	}
	public Long getIdTest() {
		return idTest;
	}
	public void setIdTest(Long idTest) {
		this.idTest = idTest;
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
