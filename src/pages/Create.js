import React, { useState } from 'react';
import {
	Container,
	Typography,
	Button,
	makeStyles,
	TextField,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	FormLabel,
} from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
	field: {
		marginTop: 20,
		marginBottom: 20,
		display: 'block',
	},
});

export default function Create() {
	const classes = useStyles();
	const history = useHistory();

	const [title, setTitle] = useState('');
	const [details, setDetails] = useState('');
	const [category, setCategory] = useState('todos');

	const [titleError, setTitleError] = useState(false);
	const [detailsError, setDetailsError] = useState(false);

	const handleSubmit = e => {
		e.preventDefault();

		setTitleError(false);
		setDetailsError(false);

		if (!title) setTitleError(true);

		if (!details) setDetailsError(true);

		if (title && details) {
			fetch('http://localhost:4000/notes', {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({ title, details, category }),
			}).then(() => history.push('/'));
		}
	};

	return (
		<Container>
			<Typography variant='h6' component='h2' color='textSecondary' gutterBottom>
				Create a New Note.
			</Typography>
			<form noValidate autoComplete='off' onSubmit={handleSubmit}>
				<TextField
					className={classes.field}
					label='Note Title'
					variant='outlined'
					color='secondary'
					fullWidth
					required
					value={title}
					onChange={e => setTitle(e.target.value)}
					error={titleError}
				/>
				<TextField
					className={classes.field}
					label='Details'
					variant='outlined'
					color='secondary'
					fullWidth
					required
					multiline
					rows={4}
					value={details}
					onChange={e => setDetails(e.target.value)}
					error={detailsError}
				/>

				<FormControl className={classes.field}>
					<FormLabel>Note Category</FormLabel>
					<RadioGroup value={category} onChange={e => setCategory(e.target.value)}>
						<FormControlLabel value='money' label='Money' control={<Radio />} />
						<FormControlLabel value='todos' label='Todos' control={<Radio />} />
						<FormControlLabel
							value='reminders'
							label='Reminder'
							control={<Radio />}
						/>
						<FormControlLabel value='work' label='Work' control={<Radio />} />
					</RadioGroup>
				</FormControl>

				<Button
					type='submit'
					variant='contained'
					color='secondary'
					endIcon={<KeyboardArrowRightIcon />}
				>
					Submit
				</Button>
			</form>
		</Container>
	);
}
