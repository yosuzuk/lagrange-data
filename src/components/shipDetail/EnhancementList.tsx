import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { IEnhancement } from '../../enhancements/types/IEnhancement';

const EnhancementListList = styled('ul')({
    paddingInlineStart: '20px',
    marginBlockStart: '0',
    marginBlockEnd: '0',
});

const EnhancementListItem = styled('li')({
    marginBottom: '8px',
});

const EnhancementPropertyList = styled('ul')({
    listStyleType: 'none',
    paddingInlineStart: '0',
});

const EnhancementPropertyListItem = styled('li')({
    margin: '4px 0',
});

interface IProps {
    enhancements: IEnhancement[];
}

export const EnhancementList = (props: IProps) => {
    const { enhancements } = props;

    return (
        <EnhancementListList>
            {enhancements.map((enhancement, index) => (
                <EnhancementListItem key={`enhancement_${index}`}>
                    <Typography variant="body2">
                        {enhancement.name}
                    </Typography>
                    <EnhancementPropertyList>
                        {toArray(enhancement.properties).map((line, index) => (
                            <EnhancementPropertyListItem key={`line_${index}`}>
                                <Typography variant="body2" color="text.secondary">
                                    {line}
                                </Typography>
                            </EnhancementPropertyListItem>
                        ))}
                    </EnhancementPropertyList>
                </EnhancementListItem>
            ))}
        </EnhancementListList>
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
