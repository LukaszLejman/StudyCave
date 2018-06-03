package studycave.application.test.verify;

import java.util.List;

public class AnswerPuzzleVerifyDTO extends AnswerVerifyDTO {
	protected Long id;
	protected List<String> puzzles;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public List<String> getPuzzles() {
		return puzzles;
	}
	public void setPuzzles(List<String> puzzles) {
		this.puzzles = puzzles;
	}
	
	
}
