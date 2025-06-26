import { defineEventHandler } from '#imports'
import { ref }                from 'vue'
import nodemailer             from 'nodemailer'

export default defineEventHandler(async (event) => {
	const formData = await readBody(event)

	const response        = ref()
	const defaultResponse = {
		status:  200,
		message: 'Votre message a bien été envoyé.',
		success: true
	}

	response.value = defaultResponse

	if (formData) {
		if (!formData['user_name']) {
			response.value = {
				status:  400,
				message: 'Le champ \"Nom\" est vide.',
				success: false
			}
		} else if (!formData['user_email']) {
			response.value = {
				status:  400,
				message: 'Le champ \"E-Mail\" est vide.',
				success: false
			}
		} else if (formData['user_email'] && !/^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i.test(formData['user_email'])) {
			response.value = {
				status:  400,
				message: 'Le champ \"E-Mail\" n\'est pas valide.',
				success: false
			}
		} else if (!formData['category']) {
			response.value = {
				status:  400,
				message: 'Le champ \"Type de demande\" est vide.',
				success: false
			}
		} else if (!formData['object']) {
			response.value = {
				status:  400,
				message: 'Le champ \"Objet\" est vide.',
				success: false
			}
		} else if (!formData['message']) {
			response.value = {
				status:  400,
				message: 'Le champ \"Message\" est vide.',
				success: false
			}
		}
	} else {
		response.value = {
			status:  400,
			message: 'Aucune information n\'a été transmise.',
			success: false
		}
	}

	if (response.value.status !== 200) {
		return response.value
	}

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		secure:  true,
		auth:    {
			user: process.env.gmailUser,
			pass: process.env.gmailPass
		}
	})

	const fields = {
		from:    `"${formData['user_name']}" <contact@evanmartin.fr>`,
		to:      [formData['recipient'], `"${formData['user_name']}" <${formData['user_email']}>`],
		subject: `[${formData['category']}] ${formData['object']}`,
		text:    formData['message']
	}

	transporter.sendMail(fields, function (error) {
		if (error) {
			response.value = {
				status:  500,
				message: error.message,
				success: false
			}
		} else {
			response.value = {
				status:  200,
				message: 'Votre message a bien été envoyé.',
				success: true
			}
		}
	})

	return response.value
})