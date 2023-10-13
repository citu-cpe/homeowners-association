import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateTicketDTO } from './dto/create-ticket.dto';
import { HosService } from './hos.service';
import { AuthGuard } from '@nestjs/passport'; // Import AuthGuard
import { InvoiceDTO } from 'src/auth/dto/invoice.dto';
@Controller('hos')
export class HosController {
  constructor(private readonly hoservice: HosService) {}

  @Get('/:id')
  getho(@Param('id') id: string): string {
    if (id === '90348589347895789347587e4') {
      return 'princh buang';
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create-ticket')
  createTicket(@Body() ticketData: CreateTicketDTO, @Request() req): void {
    this.hoservice.createTicket(ticketData, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/tickets')
  async getTickets(@Request() req) {
    return await this.hoservice.getTicketsByUserId(req.user.id);
  }

  @Put('/ticket/:id')
  async updateTicket(
    @Param('id') id: string,
    @Body() ticketData: CreateTicketDTO,
  ): Promise<any> {
    return this.hoservice.updateTicket(id, ticketData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create-invoice')
  async createInvoice(@Body() invoiceData: InvoiceDTO) {
    return await this.hoservice.createInvoice(invoiceData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/invoice')
  async getInvoices(@Request() req) {
    return await this.hoservice.getInvoicesByUserId(
      req.user.id,
      req.user.admin,
    );
  }
}
