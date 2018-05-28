package studycave.application.test;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@DiscriminatorValue("2")
public class QuestionPairs extends Question{
	@OneToMany(fetch = FetchType.LAZY,mappedBy="question",cascade = CascadeType.ALL)
    @JsonManagedReference
    List<AnswerPairs> answers;

	public List<AnswerPairs> getAnswers() {
		return answers;
	}

	public void setAnswers(List<AnswerPairs> answers) {
		this.answers = answers;
	}
		
	
}
