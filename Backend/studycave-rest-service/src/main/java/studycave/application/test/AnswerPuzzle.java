package studycave.application.test;

import javax.persistence.Entity;

@Entity
public class AnswerPuzzle extends Answer {
	private String[] correct = new String[10];

    public AnswerPuzzle() {
    	super();
    }
	
	public String[] getCorrect() {
		return correct;
	}

	public void setCorrect(String[] correct) {
		this.correct = correct;
	}
	
	
}
