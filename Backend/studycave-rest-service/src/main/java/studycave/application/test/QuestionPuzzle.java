package studycave.application.test;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class QuestionPuzzle extends Question {
	@OneToMany(fetch = FetchType.LAZY,mappedBy="question",cascade = CascadeType.ALL)
    @JsonManagedReference
    List<AnswerPuzzle> answers = new ArrayList<>();
	
	
	public QuestionPuzzle(){
		super();
	}

	public List<AnswerPuzzle> getAnswers() {
		return answers;
	}

	public void setAnswers(List<AnswerPuzzle> answers) {
		this.answers = answers;
	}
	
	public void setType() {
		this.type = "puzzle";
	}


}
