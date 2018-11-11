package studycave.application.groups;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.commons.text.RandomStringGenerator;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import studycave.application.groups.members.StudyGroupMember;
import studycave.application.user.User;
import studycave.application.user.UserRepository;

@Service
public class GroupService {

	@Autowired
	ModelMapper modelMapper;
	@Autowired
	GroupRepository groupRepository;
	@Autowired
	UserRepository userRepository;

	public ResponseEntity<?> createGroup(CreateGroupDto groupDto) {
		StudyGroup group = modelMapper.map(groupDto, StudyGroup.class);
		RandomStringGenerator generator = new RandomStringGenerator.Builder()
		        .withinRange('0', 'z')
		        .filteredBy(Character::isLetterOrDigit)
		        .build();
		group.setGroupKey(generator.generate(10));
		Optional<User> owner = this.userRepository.findByUsername(groupDto.getOwner());
		if (!owner.isPresent()) {
			return new ResponseEntity("Invalid Owner",HttpStatus.BAD_REQUEST);
		}
	    List<StudyGroupMember> members = new ArrayList<>();
	    StudyGroupMember member = new StudyGroupMember();
	    member.setUser(owner.get());
	    members.add(member);
	    group.setMembers(members);
	    
	    group = this.groupRepository.save(group);
	    GroupDto createdGroupDto = modelMapper.map(group, GroupDto.class);
	    createdGroupDto.setKey(group.getGroupKey());
	    createdGroupDto.setOwner(group.getMembers().get(0).getUser().getUsername());
	    return new ResponseEntity<GroupDto>(createdGroupDto, HttpStatus.OK);
	}
}
