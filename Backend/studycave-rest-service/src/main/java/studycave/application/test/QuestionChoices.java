package studycave.application.test;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@DiscriminatorValue("1")
public class QuestionChoices extends Question {
	
	@OneToMany(fetch = FetchType.LAZY,mappedBy="question",cascade = CascadeType.ALL)
    @JsonManagedReference
    List<AnswerChoices> answers;
	
	QuestionChoices(Question question){
		super();
	}
	
	public List<AnswerChoices>getAnswers() {
		return answers;
	}

	public void setAnswers(List<AnswerChoices> answers) {
		this.answers = answers;
	}
	
	
}
