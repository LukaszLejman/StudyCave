package studycave.application.builders;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import studycave.application.flashcard.Flashcard;
import studycave.application.flashcard.FlashcardRepository;
import studycave.application.flashcard.Set;
import studycave.application.flashcard.SetRepository;


@Component
public class FlashcardsBuilder {
	
	@Autowired
	private FlashcardRepository flashcardRepository;
	
	@Autowired
	private SetRepository setRepository;
	
	@Autowired
	public FlashcardsBuilder(FlashcardRepository flashcardRepository, SetRepository setRepository) {
		this.flashcardRepository = flashcardRepository;
		this.setRepository = setRepository;
	}
	
    public void build() {
    	int flashcardsSetsNumber = 10;
    	int flashcardsNumber = 10;
    	
    	for (int j = 0; j < flashcardsSetsNumber; j++) {
    		Set set = new Set();
    		set.setAddDate();
    		set.setEditDate();
    		set.setCategory(String.format("BuilderTEST #%d", j));
    		set.setName(String.format("Set %d",j));
    		set.setPermission("public");
    		set.setIdOwner(1);
    		
    		List<Flashcard> flashcards = new ArrayList<Flashcard>();
    		for (int i = 0; i < flashcardsNumber; i++) {
	    		Flashcard flashcard = new Flashcard();
	    		flashcard.setLeftSide(String.format("LeftSide %d %d", j, i));
	    		flashcard.setRightSide(String.format("RightSide %d %d", j, i));
	    		flashcards.add(flashcard);
	    	}
    		set.setFlashcards(flashcards);
    		setRepository.save(set);
    	}
	System.out.println("Flashcards inserted");
    }
}
