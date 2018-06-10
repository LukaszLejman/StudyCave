package studycave.application.test;

import javax.persistence.Entity;

@Entity
public class AnswerPairs extends Answer {
    private String first;
    private String second;
    
    public AnswerPairs() {
    	super();
    }
    
	public String getFirst() {
		return first;
	}
	public void setFirst(String first) {
		this.first = first;
	}
	public String getSecond() {
		return second;
	}
	public void setSecond(String second) {
		this.second = second;
	}
    

    
}
