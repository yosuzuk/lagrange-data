import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { ISkill } from '../../types/ShipDefinition';

const SkillList = styled('ul')({
    paddingInlineStart: '20px',
    marginBlockStart: '0',
    marginBlockEnd: '0',
});

const SkillListItem = styled('li')({
    marginBottom: '8px',
});

const SkillPropertyList = styled('ul')({
    listStyleType: 'none',
    paddingInlineStart: '0',
});

const SkillPropertyListItem = styled('li')({
    margin: '4px 0',
});

interface IProps {
    skills: ISkill[];
}

export const ModuleSkillList = (props: IProps) => {
    const { skills } = props;

    return (
        <SkillList>
            {skills.map((skill, index) => (
                <SkillListItem key={`skill_${index}`}>
                    <Typography variant="body2">
                        {skill.effect}
                    </Typography>
                    <SkillPropertyList>
                        {toArray(skill.properties).map((line, index) => (
                            <SkillPropertyListItem key={`line_${index}`}>
                                <Typography variant="body2" color="text.secondary">
                                    {line}
                                </Typography>
                            </SkillPropertyListItem>
                        ))}
                    </SkillPropertyList>
                </SkillListItem>
            ))}
        </SkillList>
    );
};

function toArray<T>(input: T | T[] | undefined): T[] {
    if (typeof input === 'undefined') {
        return [];
    }
    if (Array.isArray(input)) {
        return input as T[];
    }
    return [input];
}
