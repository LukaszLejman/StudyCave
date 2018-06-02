package studycave.application.test.solvedto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import studycave.application.test.AnswerChoices;

public class AnswerChoicesSolveDTO extends AnswerChoices {
	
    @JsonIgnore
    private Boolean good;
    
    public AnswerChoicesSolveDTO() {
    	super();
    }


    
	

}
